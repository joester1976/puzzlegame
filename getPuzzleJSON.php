<?php

require_once('JSON.php');
$json = new Services_JSON();

$puzzle1 = array(
    'puzzle1' => array("pos11","pos12", "pos13", "pos14", "pos21", "pos22", "pos23", "pos24", "pos31", 
						  "pos32", "pos33", "pos34", "pos41", "pos42","pos43","pos44")
);

$puzzles = array (
  'puzzle1'  => $puzzle1
 );

$puzzleType = $puzzles[$_REQUEST['puzzle']];
$output = $json->encode($puzzleType);
print($output);

?>    
