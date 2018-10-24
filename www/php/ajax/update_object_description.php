<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 09/10/18
 * Time: 17.16
 */


require_once 'helper.php';
require_once 'cs_interaction.php';

class update_object_description extends cs_interaction {
    private $value, $id, $result;

    protected function input_elaboration(){
        $this->value = $this->validate_string('description');

        if($this->value === false)
            $this->json_error('Inserire un descrizione');

        $this->id = $this->validate_string('id');

        if($this->id === false)
            $this->json_error('Selezionare un oggetto');
    }

    protected function get_db_informations(){
        $connection = $this->get_connection();

        $this->result = $connection->update_object_description($this->id, $this->value);

        if(is_error($this->result))
            $this->json_error("Impossibile aggiornare oggettoo");
    }

    protected function get_returned_data(){
        return array('rows' => $this->result);
    }
}

$update_object_description = new update_object_description();
$update_object_description->execute();