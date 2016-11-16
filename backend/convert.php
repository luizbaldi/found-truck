<?php

    include "class/connection.php";

    $connection = new connection;

    $connection->connect();

    $nome = $_POST['txtNome'];
    $latitude = $_POST['txtLatitude'];
    $longitude = $_POST['txtLongitude'];


    $insert = "insert into foodtruck(title,latitude,longitude)VALUES('$nome',$latitude,$longitude)";
    $connection->query($insert);

    //fetch table rows from mysql db
    $sql = "select * from foodtruck";
    $result = $connection->query($connection->connect(),$sql)

    //create an array
    $emparray = array();
    while($row = mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;
    }

    echo json_encode($emparray);

     //write to json file
    $fp = fopen('trucksAddress.json', 'w');
    fwrite($fp, json_encode($emparray));
    fclose($fp);

      //close the db connection
    $connection->disconnect();

    $string = 'window.appMode = "user"';

    $fa  = fopen('../js/config.js', 'w');
    fwrite($fa, $string);
    fclose($fa); 
?>
<html>
    <script>
        window.location.replace("../#findlocation");
    </script>
</html>
<?php

?>