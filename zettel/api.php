<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// TODO: Bu bilgileri kendi veritabanı ayarlarınıza göre güncelleyin
$servername = "localhost";
$username = "kullanici_adiniz"; // Veritabanı kullanıcı adınız
$password = "sifreniz";        // Veritabanı şifreniz
$dbname = "veritabani_adiniz";  // Veritabanı adınız

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Veritabanı bağlantı hatası: " . $conn->connect_error]));
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Tüm materyalleri veritabanından getir
        $sql = "SELECT * FROM materials";
        $result = $conn->query($sql);
        $materials = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $materials[] = $row;
            }
        }
        echo json_encode(["success" => true, "data" => $materials]);
        break;

    case 'POST':
        // JSON verisini al ve veritabanına kaydet
        $data = json_decode(file_get_contents('php://input'), true);
        if ($data) {
            $rCode = $conn->real_escape_string($data['R-Kod']);
            $materialType = $conn->real_escape_string($data['Materyal Türü']);
            $jsonData = $conn->real_escape_string(json_encode($data));

            $sql = "INSERT INTO materials (r_code, material_type, data) VALUES ('$rCode', '$materialType', '$jsonData') 
                    ON DUPLICATE KEY UPDATE data = '$jsonData'";
            
            if ($conn->query($sql) === TRUE) {
                echo json_encode(["success" => true, "message" => "Materyal başarıyla kaydedildi."]);
            } else {
                echo json_encode(["success" => false, "message" => "Hata: " . $conn->error]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Geçersiz veri."]);
        }
        break;

    case 'DELETE':
        // Materyali R-Koda göre sil
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['rCode'])) {
            $rCode = $conn->real_escape_string($data['rCode']);
            $sql = "DELETE FROM materials WHERE r_code='$rCode'";
            if ($conn->query($sql) === TRUE) {
                echo json_encode(["success" => true, "message" => "Materyal başarıyla silindi."]);
            } else {
                echo json_encode(["success" => false, "message" => "Hata: " . $conn->error]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Geçersiz R-Kod."]);
        }
        break;
}

$conn->close();
?>