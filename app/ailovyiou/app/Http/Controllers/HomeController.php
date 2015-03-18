<?php namespace App\Http\Controllers;

use Es;

class HomeController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Home Controller
	|--------------------------------------------------------------------------
	|
	| This controller renders your application's "dashboard" for users that
	| are authenticated. Of course, you are free to change or remove the
	| controller as you wish. It is just here to get your app started!
	|
	*/

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('guest');
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		return view('home');
	}

	public function stats($id="") 
	{

		$searchParams['index'] = 'hotels';
		$searchParams['size'] = 10;
		$searchParams['from'] = 0;
		$searchParams['body']['query']['query_string']['query'] = "postal_code:$id*";
		$searchParams['body']['aggs'] = array(
		        "articles_over_time" => array(
		            "date_histogram" => array(
		                "field" => "open_year",
		                "interval" => "month"
		            )
		        )
		);

		$result = Es::search($searchParams);

		return $result;

		return $id;
	}
}
