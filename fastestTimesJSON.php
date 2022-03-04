<?php

require_once('JSON.php');
$json = new Services_JSON();

$bestTimes = array(
    'header' => 'Puzzle Mania Fastest Times',
    'winners' => array('R2-D2',
                       ':02',
                       'C3PO',
                       ':03',
                       'Princess Leia',
                       ':05',
                       'Luke Skywalker',
                       ':08',
                       'Chewey',
                       ':10',
                       'Han Solo',
                       ':12',
                       'Lando Calrissian',
                       ':15',
                       'Obi-wan Kenobi',
                       ':18',
                       'Darth Vader',
                       ':25',
                       'Emporer Palpatine',
                       ':30')
);

$times = array (
  'bestTimes'  => $bestTimes
 );

$fastestTimes = $times[$_REQUEST['winners']];
$output = $json->encode($fastestTimes);
print($output);

?>    
