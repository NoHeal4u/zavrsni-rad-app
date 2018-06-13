<template>
	

<div class="card" style="width: 18rem;">
  <div class="card-body">
    <form class="form-horizontal">
  <div class="form-group">
    <label for="first_name" class="control-label col-xs-4">First name</label> 
    <div class="col-xs-8">
      <input id="first_name" name="first_name" placeholder="John" class="form-control" required="required" type="text">
    </div>
  </div>
  <div class="form-group">
    <label for="last_name" class="control-label col-xs-4">Last name</label> 
    <div class="col-xs-8">
      <input id="last_name" name="last_name" placeholder="Doe" class="form-control" required="required" type="text">
    </div>
  </div>
  <div class="form-group">
    <label for="email" class="control-label col-xs-4">Email</label> 
    <div class="col-xs-8">
      <input id="email" name="email" placeholder="JohnDoe@gmail.com" class="form-control" required="required" type="text">
    </div>
  </div>
  <div class="form-group">
    <label for="password" class="control-label col-xs-4">Password</label> 
    <div class="col-xs-8">
      <input id="password" name="password" placeholder="*********" class="form-control" required="required" type="text">
    </div>
  </div>
  <div class="form-group">
    <label for="confirm_password" class="control-label col-xs-4">Confirm Password</label> 
    <div class="col-xs-8">
      <input id="confirm_password" name="confirm_password" placeholder="**********" class="form-control" required="required" type="text">
    </div>
  </div>
  <div class="form-group">
    <label for="accept_terms_and_conditions" class="control-label col-xs-4">You need to accept terms and conditions in order to register</label> 
    <div class="col-xs-8">
      <label class="checkbox-inline">
        <input name="accept_terms_and_conditions" value="true" type="checkbox">
              I accept terms and conditions
      </label> 
    </div>
  </div> 
  <div class="form-group row">
    <div class="col-xs-offset-4 col-xs-8">
      <button name="submit" type="submit" class="btn btn-primary">Submit</button>
    </div>
  </div>
</form>
  </div>
</div>
</template>


<script>
	export default {

	}
</script>