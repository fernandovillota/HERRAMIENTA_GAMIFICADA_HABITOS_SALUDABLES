<?php
// api/registro.php
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

$data           = json_decode(file_get_contents('php://input'), true);
$usuario        = trim($data['usuario']        ?? '');
$contrasena     = trim($data['contrasena']     ?? '');
$nombre_completo= trim($data['nombre_completo']?? '');
$rol            = trim($data['rol']            ?? 'estudiante');

if (empty($usuario) || empty($contrasena) || empty($nombre_completo)) {
    echo json_encode(['success' => false, 'message' => 'Completa todos los campos']);
    exit;
}
if (strlen($usuario) < 3) {
    echo json_encode(['success' => false, 'message' => 'El usuario debe tener mínimo 3 caracteres']);
    exit;
}
if (strlen($contrasena) < 4) {
    echo json_encode(['success' => false, 'message' => 'La contraseña debe tener mínimo 4 caracteres']);
    exit;
}

// Verificar si ya existe
$stmt = $pdo->prepare("SELECT id FROM usuarios WHERE usuario = ?");
$stmt->execute([$usuario]);
if ($stmt->fetch()) {
    echo json_encode(['success' => false, 'message' => 'Ese usuario ya existe, elige otro']);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO usuarios (usuario, contrasena, nombre_completo, rol, puntos, nivel) VALUES (?, ?, ?, ?, 0, 1)");
$stmt->execute([$usuario, $contrasena, $nombre_completo, $rol]);

echo json_encode([
    'success' => true,
    'message' => '¡Cuenta creada con éxito!',
    'user'    => [
        'id'     => $pdo->lastInsertId(),
        'nombre' => $nombre_completo,
        'usuario'=> $usuario,
        'rol'    => $rol
    ]
]);
