<?php
/**
 * Developer: Daniel Surpanu
 */

require_once 'helper.php';
require_once 'cs_interaction.php';

class update_object_type extends cs_interaction {
    private $value, $id, $result;

    protected function input_elaboration(){
        $this->value = $this->validate_string('type');

        if($this->value === false)
            $this->json_error('Selezionare una tipologia');

        $this->id = $this->validate_string('id');

        if($this->id === false)
            $this->json_error('Selezionare un oggetto');
    }

    protected function get_db_informations(){
        $connection = $this->get_connection();

        $this->result = $connection->update_object_type($this->id, $this->value);

        if(is_error($this->result))
            $this->json_error("Impossibile aggiornare la tipologia");
    }

    protected function get_returned_data(){
        return array('rows' => $this->result);
    }
}

$update_object_type = new update_object_type();
$update_object_type->execute();