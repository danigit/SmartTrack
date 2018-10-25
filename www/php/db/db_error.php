<?php
/**
 * Created by PhpStorm.
 * User: surpa
 * Date: 8/22/2018
 * Time: 12:09 PM
 */

class db_error{

    public static $ERROR_ON_EXECUTE                 = 1;
    public static $ERROR_ON_LOGIN                   = 2;
    public static $ERROR_ON_REGISTER                = 3;
    public static $EMAIL_ALREADY_REGISTERED         = 4;
    public static $ERROR_ON_GETTING_EMAIL           = 5;
    public static $ERROR_ON_GET_TYPES               = 6;
    public static $ERROR_ON_CLOSING_KIT             = 7;
    public static $ERROR_ON_CONTROLLING_RECOVER_KIT = 8;
    public static $ERROR_ON_GETTING_OBJECTS         = 9;
    public static $ERROR_ON_RECOVERING_KIT          = 10;
    public static $ERROR_ON_SUSPENDING_KIT          = 11;
    public static $TYPE_ALREADY_INSERTED            = 12;
    public static $OBJECT_ALREADY_INSERTED          = 13;
    public static $SEND_KIT_ERROR                   = 14;
    public static $ERROR_ON_INSERTING_TYPE          = 15;
    public static $ERROR_ON_CREATING_KIT            = 18;
    public static $ERROR_ON_GETTING_KIT             = 19;
    public static $ERROR_ON_GETTING_TAG             = 20;
    public static $WRONG_NUMBER_OF_PARAMETERS       = 32;
    public static $DELETE_TYPE_ERROR                = 33;
    public static $ERROR_ON_UPDATING_TYPE           = 33;

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
            case 2: return "DUPLICATE_USERNAME";
            case 3: return "DUPLICATE_EMAIL";
            case 4: return "REGISTER_FAILED";
            case 5: return "LOGIN_FAILED";
            case 6: return "EMAIL_ERROR";
            case 7: return "USER_ERROR";
            case 8: return "COOKIE_ERROR";
            case 9: return "COOKIE_USER_ERROR";
            case 10: return "SET_PASSWORD_ERROR";
            case 11: return "SET_NAME_SURNAME_ERROR";
            case 12: return "TYPE_ALREADY_INSERTED";
            case 13: return "OBJECT_ALREADY_INSERTED";
            case 14: return "SEND_KIT_ERROR";
            case 15: return "ERROR_ON_INSERTING_TYPE";
            case 16: return "DUPLICATE_COOKIE_KEY";
            case 17: return "GET_USER_BY_EMAIL_ERROR";
            case 18: return "INSERT_EDIT_USER_ERROR";
            case 19: return "UPDATE_USER_ERROR";
            case 20: return "ADD_SEGNALATION_ERROR";
            case 21: return "ERROR_GET_CATEGORIES";
            case 22: return "ERROR_GET_SEGNALATION";
            case 23: return "SAVE_MESSAGGE_ERROR";
            case 24: return "ERROR_ON_MARK_AS_SOLVED";
            case 25: return "ERROR_ON_MARK_AS_UNSOLVED";
            case 26: return "ERROR_ON_GET_MESSAGE";
            case 27: return "ERROR_ON_UPDATE_CHAT_OPENED";
            case 28: return "ERROR_ON_DELETE_COOKIE";
            case 29: return "ERROR_GET_LAST_TEN_SEGNALATIONS";
            case 30: return "DUPLICATE_SOLVED";
            case 31: return "DUPLICATE_UNSOLVED";
            case 32: return "WRONG_NUMBER_OF_PARAMETERS";
            case 33: return "ERROR_ON_GET_USERS";
            case 34: return "ERROR_ON_BAN_USER";
            case 35: return "ERROR_ON_UNBAN_USER";
            case 36: return "ERROR_ON_IS_ADMIN";
            case 37: return "ERROR_ON_GET_USER_PRIVILEGES";
            case 38: return "FOREIGN_KEY_ERROR";
            case 39: return "DELETE_COOKIE_ERROR";
            case 40: return "ERROR_ON_GET_USER_PROFILE";
            default: return null;
        }
    }
}

