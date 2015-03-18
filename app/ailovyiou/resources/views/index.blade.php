@extends('main')

@section('content')

<div class="container-full">

  <div class="row">

    <div class="col-lg-12 text-center v-center">

      <h1>youlovei</h1>
      <p class="lead">Η γρηγορότερη τουριστική μηχανή αναζήτης είναι γεγονός</p>

      <br><br><br>

      <form class="col-lg-12">
        <div class="input-group" style="width:340px;text-align:center;margin:0 auto;">
          <input class="form-control input-lg" title="Don't worry. We hate spam, and will not share your email with anyone." placeholder="Αναζήτησε τους όρους" type="text">
          <span ng-model="searchText" class="input-group-btn"><button class="btn btn-lg btn-primary" type="button">Αναζήτηση</button></span>
        </div>
      </form>
    </div>

  </div> <!-- /row -->
  
  <div class="row">

    <div class="col-lg-12 text-center v-center" style="font-size:39pt;">
      <a href="#"><i class="icon-google-plus"></i></a> <a href="#"><i class="icon-facebook"></i></a>  <a href="#"><i class="icon-twitter"></i></a> 
    </div>

  </div>
  
  <br><br><br><br><br>

</div> <!-- /container full -->
@endsection