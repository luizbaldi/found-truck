<?php
        $connection = mysqli_connect("localhost","root","","foundtruck") or die("Error " . mysqli_error($connection));


    $nome = $_POST['txtNome'];
    $latitude = $_POST['txtLatitude'];
    $longitude = $_POST['txtLongitude'];


    $insert = "insert into foodtruck(title,latitude,longitude)VALUES('$nome',$latitude,$longitude)";
    mysqli_query($connection, $insert) or die("Error in Selecting " . mysqli_error($connection));

    //fetch table rows from mysql db
    $sql = "select * from foodtruck";
    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

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
    mysqli_close($connection);

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