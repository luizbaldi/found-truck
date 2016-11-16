<?php
	class Connection{	

    var $host = "localhost";
    var $user = "root"; 
    var $password = "";
    var $database = "foundtruck";

    var $query;
    var $link;
    var $result;

    function MySQL(){
    
    }

    function connect(){

        $this->link = @mysql_connect($this->host,$this->user,$this->password);

        if(!$this->link){

            print "Ocorreu um Erro na conexão MySQL:";
			print "<b>".mysql_error()."</b>";

      		die();

        }elseif(!mysql_select_db($this->database,$this->link)){
    
            print "Ocorreu um Erro em selecionar o Banco:";
		    print "<b>".mysql_error()."</b>";

      		die();

        }

    }

    function sql_query($query){

        $this->connect();

        $this->query = $query;
   
        if($this->resultado = mysql_query($this->query)){

            $this->disconnect();

            return $this->resultado;

        }else{

		    print "Ocorreu um erro ao executar a Query MySQL: <b>$query</b>";
		    print "<br><br>";
		    print "Erro no MySQL: <b>".mysql_error()."</b>";

      		die();

            $this->disconnect();

        }        

    }

    function disconnect(){

        return mysql_close($this->link);

    }

}

?>
		


