<?php
$servername = "localhost";
$username = "DaUser"; // Kendi veritabanı kullanıcı adını buraya gir
$password = "remuser2569";        // Kendi veritabanı şifreni buraya gir
$dbname = "create_table.sql";  // Kendi veritabanı adını buraya gir

// Veritabanı bağlantısını kur
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Veritabanı bağlantı hatası: " . $conn->connect_error);
}

// SQL dosyasının içeriğini oku
$sql = file_get_contents('create_table.sql');

if ($conn->multi_query($sql) === TRUE) {
    echo "Tablo başarıyla oluşturuldu.";
} else {
    echo "Hata: " . $conn->error;
}

$conn->close();

// Güvenlik için bu dosyayı (create_table.php) çalıştıktan sonra otomatik olarak sil
// if (file_exists('create_table.php')) {
//     unlink('create_table.php');
// }
?>