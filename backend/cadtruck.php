<div ui-view>
	<div class="col-md-12 col-xs-12 text-center" id="error">
		<label class="submsgErro col-md-12 col-xs-12">CADASTRO DE FOODTRUCK</label>

		<form method="POST" action="../backend/convert.php" class="form-horizontal col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1">

<!-- Text input-->
<div class="form-group"> 
  <div>
  <input id="textinput" required="true" name="txtNome" type="text" placeholder="Nome do Foodtruck" class="form-control input-md">
    
  </div>
</div>

<!-- Text input-->
<div class="form-group"> 
  <div>
  <input id="textinput" required="true" name="txtLatitude" type="text" placeholder="Insira a latitude do foodtruck" class="form-control input-md">
    
  </div>
</div>

<!-- Text input-->
<div class="form-group">
  <div>
  <input id="textinput" required="true" name="txtLongitude" type="text" placeholder="Insira a longitude do foodtruck" class="form-control input-md">
    
  </div>
</div>


<button class="btn btn-danger findbtn" type="submit">INSERIR FOODTRUCK</button>
</form>

	</div>
</div>