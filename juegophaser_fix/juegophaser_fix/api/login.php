<?php
// api/login.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$host     = 'localhost';
$dbname   = 'habitos_saludables';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error de conexión: ' . $e->getMessage()]);
    exit;
}

$data     = json_decode(file_get_contents('php://input'), true);
$usuario  = trim($data['usuario']  ?? '');
$password_input = trim($data['contrasena'] ?? '');

if (empty($usuario) || empty($password_input)) {
    echo json_encode(['success' => false, 'message' => 'Completa todos los campos']);
    exit;
}

$stmt = $pdo->prepare("SELECT id, nombre_completo, usuario, contrasena, rol, puntos, nivel, logros FROM usuarios WHERE usuario = ?");
$stmt->execute([$usuario]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && $user['contrasena'] === $password_input) {
    echo json_encode([
        'success' => true,
        'message' => '¡Bienvenido!',
        'user'    => [
            'id'     => $user['id'],
            'nombre' => $user['nombre_completo'],
            'usuario'=> $user['usuario'],
            'rol'    => $user['rol'],
            'puntos' => (int)$user['puntos'],
            'nivel'  => (int)$user['nivel'],
            'logros' => (int)$user['logros']
        ]
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos']);
}
