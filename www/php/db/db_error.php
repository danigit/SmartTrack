<?php
/**
 * Created by PhpStorm.
 * User: surpa
 * Date: 8/22/2018
 * Time: 12:09 PM
 */

class db_error{

    public static $ERROR_ON_EXECUTE                   = 1;
    public static $ERROR_ON_LOGIN                     = 2;
    public static $ERROR_ON_RESET_PASSWORD            = 3;
    public static $ERROR_ON_REGISTER                  = 4;
    public static $ERROR_ON_GETTING_KIT               = 5;
    public static $ERROR_ON_GET_TYPES                 = 6;
    public static $ERROR_ON_GETTING_TAG               = 7;
    public static $ERROR_ON_GETTING_OBJECTS           = 8;
    public static $ERROR_ON_CREATING_KIT              = 9;
    public static $ERROR_ON_SUSPENDING_KIT            = 10;
    public static $ERROR_ON_RECOVERING_KIT            = 11;
    public static $ERROR_ON_CONTROLLING_RECOVER_KIT   = 12;
    public static $ERROR_ON_SEND_KIT                  = 13;
    public static $ERROR_ON_CLOSING_KIT               = 14;
    public static $ERROR_ON_GETTING_KIT_HISTORY       = 15;
    public static $ERROR_ON_GETTING_TEMPLATE          = 16;
    public static $ERROR_ON_GETTING_OBJECTS_POSITION  = 17;
    public static $ERROR_ON_INSERTING_TYPE            = 18;
    public static $ERROR_ON_INSERTING_OBJECT          = 19;
    public static $ERROR_ON_DELETE_TYPE               = 20;
    public static $ERROR_ON_DELETE_OBJECT             = 21;
    public static $ERROR_ON_UPDATING_TYPE             = 22;
    public static $ERROR_ON_UPDATING_DESCRIPTION      = 23;
    public static $ERROR_ON_TYPE_ALREADY_INSERTED     = 24;
    public static $ERROR_ON_OBJECT_ALREADY_INSERTED   = 25;
    public static $ERROR_ON_EMAIL_ALREADY_REGISTERED  = 26;

    private $error;

    public function __construct($error){
        $this->error = $error;
    }

    public function getError(){
        return $this->error;
    }

    public function getErrorName(){
        switch ($this->error){
            case 1: return "ERROR_ON_EXECUTE";
            case 2: return "ERROR_ON_LOGIN";
            case 3: return "ERROR_ON_RESET_PASSWORD";
            case 4: return "ERROR_ON_REGISTER";
            case 5: return "ERROR_ON_GETTING_KIT";
            case 6: return "ERROR_ON_GET_TYPES";
            case 7: return "ERROR_ON_GETTING_TAG";
            case 8: return "ERROR_ON_GETTING_OBJECTS";
            case 9: return "ERROR_ON_CREATING_KIT";
            case 10: return "ERRON_ON_SUSPENDING_KIT";
            case 11: return "ERROR_ON_RECOVERING_KIT";
            case 12: return "ERROR_ON_CONTROLLING_RECOVER_KIT";
            case 13: return "ERROR_ON_SEND_KIT";
            case 14: return "ERROR_ON_CLOSING_KIT";
            case 15: return "ERROR_ON_GETTING_KIT_HISTORY";
            case 16: return "ERROR_ON_GETTING_TEMPLATE";
            case 17: return "ERROR_ON_GETTING_OBJECTS_POSITION";
            case 18: return "ERROR_ON_INSERTING_TYPE";
            case 19: return "ERROR_ON_INSERTING_OBJECT";
            case 20: return "ERROR_ON_DELETE_TYPE";
            case 21: return "ERROR_ON_DELETE_OBJECT";
            case 22: return "ERROR_ON_UPDATING_TYPE";
            case 23: return "ERROR_ON_UPDATING_DESCRIPTION";
            case 24: return "ERROR_ON_TYPE_ALREADY_INSERTED";
            case 25: return "ERROR_ON_OBJECT_ALREADY_INSERTED";
            case 26: return "ERROR_ON_EMAIL_ALREADY_REGISTERED";
            default: return null;
        }
    }
}

