<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 02/10/18
 * Time: 15.39
 */


require_once 'helper.php';
require_once 'cs_interaction.php';

class insert_object extends cs_interaction {
    private $type, $tag, $description, $result;

    protected function input_elaboration(){
        $this->type = $this->validate_string('type');

        if(!$this->type)
            $this->json_error('Seleziona un tipo');

        $this->tag = $this->validate_string('tag');

        if(!$this->tag)
            $this->json_error('Inserisci un tag');

        $this->description = $this->validate_string('description');

        if(!$this->description)
            $this->json_error('Inserisci una descrizione');
    }

    protected function get_db_informations(){
        $connection = $this->get_connection();

        $this->result = $connection->insert_object($this->type, $this->tag, $this->description);

        if(is_error($this->result))
            $this->json_error("Impossibile salvare l'oggetto");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$insert_object = new insert_object();
$insert_object->execute();