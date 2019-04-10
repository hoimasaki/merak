var _ = require("underscore");

var response_code = module.exports = {
    "RETCODE_NOT_REGIST" : {"RetCode" : -1, "Message" : "RetCode is not exists" },                                     //框架级
    "VERIFY_FAIL" : {"RetCode" : 100, "Message" : "Verify fail" },                                     //框架级
    "TIME_OUT" : {"RetCode" : 110, "Message" : "Time out" },                                           //与远端连接
    "DATA_FAIL" : {"RetCode" : 120, "Message" : "Data fail" },                                         //字段、数据错误
    "SERVICE_ERROR" : {"RetCode" : 130, "Message" : "Service error and break" },
    "USER_PERMISSIONS" : {"RetCode" : 140, "Message" : "User permissions" },                           //框架级
    "SERVICE_UNAVAILABLE" : {"RetCode" : 150, "Message" : "Service unavailable" },
    "MISSING_ACTION" : {"RetCode" : 160, "Message" : "Missing Action" },                               //框架级
    "MISSING_SIGNATURE" : {"RetCode" : 170, "Message" : "Missing signature" },                         //框架级
    "ERROR_SIGNATURE" : {"RetCode" : 171, "Message" : "Signature VerfyAC Error" },                         //框架级
    "USER_NOT_EXISTS" : {"RetCode" : 172, "Message" : "User Not Exists" },                         //框架级
    "MISSING_API_VERSION" : {"RetCode" : 180, "Message" : "Missing api version" },                     //框架级
    "API_VERION_ERROR" : {"RetCode" : 190, "Message" : "Api verion error" },                           //框架级
    "GET_NAMES_ERROR" : {"RetCode" : 200, "Message" : "Get names error" },                             //框架级
    "MISSING_PARAMS" : {"RetCode" : 220, "Message" : "Missing params [%s]" },                            //框架级
    "PARAMS_RANGE_ERROR" : {"RetCode" : 210, "Message" : "Params [%s], should be greater than %d and less than %d" },//框架级
    "PARAMS_ERROR" : {"RetCode" : 230, "Message" : "Params [%s] not available" },                             //框架级
    "PERMISSION_ERROR" : {"RetCode" : 240, "Message" : "Permission error" },                             //框架级
    "LACK_OF_BALANCE" : {"RetCode" : 520, "Message" : "Lack of balance" },                             //框架级
    "DEDUCTIONS_ERROR" : {"RetCode" : 260, "Message" : "Deductions error" },                             //框架级
    "SETTLEMENT_ERROR" : {"RetCode" : 270, "Message" : "Settlement error" },                             //框架级
    "DATA_EXIST":{"RetCode":290,"Message":"Data Exist"},                                             //框架级
    "DATA_NOT_EXIST":{"RetCode":300,"Message":"Data not Exist"}                                     //框架级
};

_.extend(response_code, {
    "TIME_RANGE_ERROR": {"RetCode" : 300, "Message" : "Params [%s], EndTime not be less BeginTime"},
});

//UMEM:20000-20999
 _.extend(response_code, {
	"CREATE_UMEM_RESOURCE_ERROR": {'RetCode': 20000, 'Message': 'create error'},//create umem resource error
	"UPDATE_UMEM_RESOURCE_ERROR": {'RetCode': 20001, 'Message': 'update error'},//update umem resource error
	"DELETE_UMEM_RESOURCE_ERROR": {'RetCode': 20002, 'Message': 'delete error'},//delete umem resource error
	"GET_UMEM_RESOURCE_LIST_ERROR": {'RetCode': 20003, 'Message': 'get error'},//get umem resource list error
	"CHECK_UMEM_RESOURCE_PERMISSION_ERROR": {'RetCode': 20004, 'Message': 'check error'},//check umem resource permission error

	"CREATE_UMEM_BILL_ERROR": {'RetCode': 20010, 'Message': 'create error'},//create umem order error'
	"UPGRADE_UMEM_BILL_ERROR": {'RetCode': 20011, 'Message': 'upgrade error'},//upgrade umem order error'
    "TRIAL_UMEM_ERROR": {'RetCode': 20015, 'Message': 'create error'},// 'trial error'

	"CREATE_UMEM_SPACE_ERROR": {'RetCode': 20100, 'Message': 'create space error'},//create umem space error
	"RESIZE_UMEM_SPACE_ERROR": {'RetCode': 20101, 'Message': 'resize space error'},//resize umem space error
	"DESCRIBE_UMEM_SPACE_ERROR": {'RetCode': 20102, 'Message': 'describe space error'},//describe umem space error
	"DELETE_UMEM_SPACE_ERROR": {'RetCode': 20103, 'Message': 'delelte space error'},//delelte umem space error
	"DELETE_EXPIRED_UMEM_ERROR": {'RetCode': 20104, 'Message': 'delelte space error'},//delelte expired umem space error

	"CREATE_UMEM_BACKUP_ERROR": {'RetCode': 20200, 'Message': 'create backup error'},//create umem backup error
	"DELETE_UMEM_BACKUP_ERROR": {'RetCode': 20201, 'Message': 'delete backup error'},//delete umem backup error
	"DESCRIBE_UMEM_BACKUP_ERROR": {'RetCode': 20202, 'Message': 'describe backup error'},//describe umem backup error
	"ADD_UMEM_BACKUP_TASK_ERROR": {'RetCode': 20203, 'Message': 'add bakcup error'},//add umem bakcup task error
	"EDIT_UMEM_BACKUP_TASK_ERROR": {'RetCode': 20204, 'Message': 'edit bakcup error'},//edit umem bakcup task  error
	"DELETE_UMEM_BACKUP_TASK_ERROR": {'RetCode': 20205, 'Message': 'delete backup error'},//delete umem backup task error
	"DESCRIBE_UMEM_BACKUP_TASK_ERROR": {'RetCode': 20206, 'Message': 'describe backup error'},//describe umem backup task error
	"RECOVER_UMEM_BACKUP_ERROR": {'RetCode': 20207, 'Message': 'recover bakcup error'},//recover umem bakcup error
});

_.extend(response_code, {
    "CREATE_UMR_ERROR": {"RetCode" : 2000, "Message" : "Create umr error"},
    "DELETE_UMR_ERROR": {"RetCode" : 2001, "Message" : "Delete umr error"},
    "GET_UMR_ERROR": {"RetCode" : 2002, "Message" : "Get umr error"},
    "UPDATE_UMR_ERROR": {"RetCode" : 2003, "Message" : "Update umr error"},
    "GET_CREDENTIAL_ERROR": {"RetCode" : 2004, "Message" : "Get Credentials error"},
    "RESET_CREDENTIAL_ERROR": {"RetCode" : 2005, "Message" : "Reset Credentials error"},
    "GET_CREDENTIAL_ERROR": {"RetCode" : 2006, "Message" : "Get Umr Conf error"},
    "GET_JOB_ERROR": {"RetCode" : 2007, "Message" : "Get job error"},
    "GET_TASK_ERROR": {"RetCode" : 2008, "Message" : "Get task error"},
    "GET_ATTEMT_TASK_ERROR": {"RetCode" : 2009, "Message" : "Get attempt task error"},
    "GET_TASK_LOG_ERROR": {"RetCode" : 2010, "Message" : "Get task log error"},
    "GET_JOB_LOG_ERROR": {"RetCode" : 2011, "Message" : "Get job log error"},
	"CHECK_UMR_RESOURCE_ERROR": {"RetCode": 2006, "Message": "Check resource error for [%s]"},
	"UMR_RESOURCE_NOT_EXIST" : {"RetCode" : 2007, "Message" : "Resource not available or permission denied for UmrInstanceID [%s]" },
	//UHIVE 2500-2799
	"HIVE_RESOURCE_ALLOC": {"RetCode" : 2500, "Message" : "Alloc resource error"},
	"HIVE_GET_RESOURCE": {"RetCode" : 2501, "Message" : "Get resource error"},
	"HIVE_GET_UMR": {"RetCode" : 2502, "Message" : "Get umr error"},
    "HIVE_UMR_NAME": {"RetCode" : 2503, "Message" : "Get umr service error"},
    "HIVE_GET_UNET": {"RetCode" : 2504, "Message" : "Get unet error"},
    "HIVE_UNET_NAME": {"RetCode" : 2505, "Message" : "Get unet service error"},
    "HIVE_GET_HIVE": {"RetCode" : 2506, "Message" : "Get hive error"},
    "HIVE_HIVE_NAME": {"RetCode" : 2507, "Message" : "Get hive service error"},

	//UHBASE 2800-2999
    "HBASE_RESOURCE_ALLOC": {"RetCode" : 2800, "Message" : "Alloc resource error"},
    "HBASE_GET_RESOURCE": {"RetCode" : 2801, "Message" : "Get resource error"},
    "HBASE_GET_UMR": {"RetCode" : 2802, "Message" : "Get umr error"},
    "HBASE_UMR_NAME": {"RetCode" : 2803, "Message" : "Get umr service error"},
    "HBASE_GET_UNET": {"RetCode" : 2804, "Message" : "Get unet error"},
    "HBASE_UNET_NAME": {"RetCode" : 2805, "Message" : "Get unet service error"},
    "HBASE_GET_HBASE": {"RetCode" : 2806, "Message" : "Get hbase error"},
    "HBASE_HBASE_NAME": {"RetCode" : 2807, "Message" : "Get hbase service error"},

 });
_.extend(response_code,{
 	//UCDN
    "UCDN_NO_RESPONSE":{"RetCode":44000,"Message" : "No response"},
	"CREATE_DOMAIN_ERROR": {"RetCode" : 44001, "Message" : "Create domain error"},
	"CREATE_DOMAIN_UPDATE_DOMAIN_ID_ERROR": {"RetCode" : 44002, "Message" : "Create domain error"},
	"CREATE_DOMAIN_GET_DOMAIN_ID_ERROR": {"RetCode" : 44003, "Message" : "Create domain error"},
	"DESCRIBE_DOMAIN_GET_DOMAIN_ID_ERROR": {"RetCode" : 44004, "Message" : "Create domain error"},
	"DESCRIBE_DOMAIN_ERROR": {"RetCode" : 44005, "Message" : "Create domain error"},
    "UPDATE_DOMAIN_ERROR":{"RetCode" : 44006, "Message" : "Update domain error"},
    "UCDN_GET_BANDWIDTHS_ERROR":{"RetCode" :44007, "Message": "Get domain bandwidth error"},
    "UCDN_GET_TRAFFIC_DATA_ERROR":{"RetCode" :44008, "Message": "Get domain traffic data error"},
    "UCDN_GET_LOG_ERROR":{"RetCode" :44009, "Message": "Get log error"},
    "UCDN_GET_CONTENT_REFRESH_FILE_ERROR":{"RetCode" :44010, "Message": "Content refresh file error"},
    "UCDN_GET_CONTENT_REFRESH_DIR_ERROR":{"RetCode" :44011, "Message": "Content refresh directory error"},
    "UCDN_GET_CONTENT_REFRESH_ERROR":{"RetCode" :44012, "Message": "Content refresh error"},
    "UCDN_GET_REFRESH_TASK_ERROR":{"RetCode" :44013, "Message": "Get refresh task error"},
    "UCDN_GET_BUY_TRAFFIC_ERROR":{"RetCode" :44014, "Message": "Get interl error while buy traffic error"},
    "UCDN_GET_TRAFFIC_PRICE_ERROR":{"RetCode" :44015, "Message": "Get interl error while get traffic price"},
    "UCDN_GET_TRAFFIC_USED_ERROR":{"RetCode" :44016, "Message": "Get interl error while get traffic used"},
    "UCDN_GET_ORDER_NO_ERROR":{"RetCode" :44017, "Message": "Get interl error while get order no"},
    "UCDN_CREATE_BUY_TRAFFIC_RECORD_ERROR":{"RetCode" :44018, "Message": "Get interl error while create trafic record"},
    "UCDN_GET_PREFETCH_TASK_ERROR":{"RetCode" :44019, "Message": "Get error while create trafic record"},
    "CREATE_DOMAIN_NO_TARFFIC":{"RetCode" :44020, "Message": "There is not traffic,please buy first  !"},
    "UCDN_RESOURCE_NOT_EXIST" : {"RetCode" : 44021, "Message" : "Resource not available or permission denied for DomainId [%s]" },
    "UCDN_CREATE_RENEW_ORDER_ERROR":{"RetCode" :44022, "Message": "Get interl error while get renew order"},
    "CHECK_ICP_ERROR": {"RetCode" : 44023, "Message" : "Check icp err[%s]"},
    "UCDN_GET_SECOND_CACHE_STATE_ERROR":{"RetCode" : 44024, "Message" : "Get domain second cache fail!"},
    "UCDN_SECOND_CACHE_NOT_OPEN":{"RetCode" : 44025, "Message" : "It's not open of the domain second cache."},
    "CREATE_DOMAIN_NO_SEA_TARFFIC":{"RetCode" :44026, "Message": "There is not abroad traffic,please buy first!"},
    "UCDN_GET_BUY_TAFFIC_ERROR":{"RetCode" :44027, "Message": "Get interl error when purchase value!"},
    "UCDN_UPDATE_DOMAIN_STATUS_ERROR":{"RetCode" :44519, "Message": "Change domain status error!"},
    "GET_DOMAIN_PREFETCH_ENABLE_ERROR":{"RetCode" :44528, "Message": "Get domain prefetch enable error!"},
});

//udisk
_.extend(response_code, {
    "CREATE_UBS_ERROR": {'RetCode': 5000, 'Message': 'create ubs error'},
    "UBS_RESOURCE_NOT_ENOUGH": {'RetCode': 5009, 'Message': 'Not enough udisk resource'},
    "CREATE_SNAPSHOT_ERROR": {'RetCode': 5001, 'Message': 'create snapshot error'},
    "CLONE_UBS_ERROR": {'RetCode': 5002, 'Message': 'clone ubs error'},
    "CLONE_UBS_SNAPSHOT_ERROR": {'RetCode': 5003, 'Message': 'clone ubs snapshot error'},
    "RESIZE_UBS_ERROR": {'RetCode': 5004, 'Message': 'resize ubs error'},
    "DELETE_UBS_ERROR": {'RetCode': 5005, 'Message': 'deletel ubs error'},
    "DELETE_SNAPSHOT_ERROR": {'RetCode': 5006, 'Message': 'delete snapshot error'},
    "LIST_UBS_ERROR": {'RetCode': 5007, 'Message': 'list ubs error'},
    "LIST_SNAPSHOT_ERROR": {'RetCode': 5008, 'Message': 'list snapshot error'},
});
//udisk end

_.extend(response_code, {

	"DESCRIBE_UHOST_INSTANCE_ERROR": {"RetCode": 8000, "Message": "Describe UHost error"},
	"STOP_UHOST_INSTANCE_ERROR": {"RetCode": 8001, "Message": "Stop UHost error"},
	"START_UHOST_INSTANCE_ERROR": {"RetCode": 8002, "Message": "Start UHost error"},
	"POWEROFF_UHOST_INSTANCE_ERROR": {"RetCode": 8003, "Message": "Poweroff UHost error"},
	"REBOOT_UHOST_INSTANCE_ERROR": {"RetCode": 8004, "Message": "Reboot UHost error"},
	"REINSTALL_UHOST_INSTANCE_ERROR": { "RetCode": 8005, "Message": "Reinstall UHost error"},
	"RESET_UHOST_INSTANCE_PASSWORD_ERROR": { "RetCode": 8006, "Message": "Reset UHost password error"},
	"MODIFY_UHOST_INSTANCE_NAME_ERROR": { "RetCode": 8007, "Message": "Modify UHost name error"},
	"CREATE_CUSTOM_IAMGE_ERROR": { "RetCode": 8008, "Message": "Create custom image error"},
	"TERMINATE_UHOST_INSTANCE_ERROR": { "RetCode": 8009, "Message": "Terminate UHost error"},
	"UHOST_IS_NOT_SHUTOFF": { "RetCode": 8010, "Message": "Make sure your UHost is SHUTOFF"},
	"UHOST_NOT_EXIST": { "RetCode": 8011, "Message": "Make sure your UHost EXISTS"},
	"DESC_UHOST_INSTANCE_ERROR": { "RetCode": 8012, "Message": "Get UHost instance information error"},
	"SUBMIT_PAYMENT_STATUS_FAIL": { "RetCode": 8013, "Message": "Submit payment status fail"},
	"UHOST_STATUS_NOT_ALLOWED": { "RetCode": 8014, "Message": "Your UHost status is running or install fail"},
	"UDISK_NOT_DETACH_ERROR": { "RetCode": 8015, "Message": "Please detach all your UDisk before reinstall"},
	"REINSTALL_NOT_SUPPORT": { "RetCode": 8016, "Message": "Reinstall for this type of UHost is not support"},
	"IMAGEID_NOT_VALID": { "RetCode": 8017, "Message": "The ImageId [%s] is invalid"},
	"CHECK_BILL_INFO_ERROR": { "RetCode": 8018, "Message": "Get an error while ask UHost's charge infomation "},
	"GET_IPID_ERROR": { "RetCode": 8019, "Message": "Get an error while ask the id of public IP"},
	"BILL_INFO_NOT_AVAILABLE": { "RetCode": 8020, "Message": "Get no charge information"},
	"IP_ID_NOT_AVAILABLE": { "RetCode": 8021, "Message": "Get no IP id information"},
	"DELETE_RESOURCE_ERROR": { "RetCode": 8022, "Message": "Get an error while remove UHost resource"},
	"SUBMIT_PAYMENT_STATUS_ERROR": { "RetCode": 8023, "Message": "Get an error while submit status to billing"},
	"SET_EXTEND_INFO_ERROR": { "RetCode": 8024, "Message": "Get an error while set extend information"},
	"GET_EXTEND_INFO_ERROR": { "RetCode": 8025, "Message": "Get an error while get extend information"},
	"QUERY_IMAGE_ERROR": { "RetCode": 8026, "Message": "Get an error while query image information"},
	"ONE_CORE_TO_WINDOWS_NOT_ALLOWED": { "RetCode": 8027, "Message": "Reinstall OS from Linux to Windows with one core is not ALLOWED"},
	"UNKNOWN_OS_TYPE": { "RetCode": 8028, "Message": "Your OS type is UNKNOWN"},
	"MULTIPLE_PARAMS": { "RetCode": 8029, "Message": "Multiple params found"},
	"UHOST_IS_DELETED": { "RetCode": 8030, "Message": "This instance is DELETED"},
	"GET_VNC_INFO_ERROR": { "RetCode": 8031, "Message": "Get an error while request vnc info for UHost [%s]"},
	"GET_SNAPSHOT_LIST_ERROR": { "RetCode": 8032, "Message": "Get an error while get snapshot list for UHost [%s]"},
	"CREATE_SNAPSHOT_ERROR": { "RetCode": 8033, "Message": "Get an error while create a snapshot for UHost [%s]"},
	"UHOST_IS_ON_RESETTING_PASSWORD": { "RetCode": 8034, "Message": "UHost instance is on resetting password, please wait"},
	"UHOST_IS_ON_MIGRATE": { "RetCode": 8035, "Message": "UHost is on migrating, please wait"},
    "CREATE_UHOST_CPU_TOO_SMALL_FOR_WIN": {"RetCode" : 8036, "Message" : "CPU Core Count should greater than 2 for windows system"},
	"CHECK_RESOURCE_ERROR": {"RetCode": 8037, "Message": "Get an error while check resource"},
	"DETACH_UDISK_ERROR": {"RetCode": 8038, "Message": "Detach udisk [%s] from [%s] error"},
	"RESOURCE_NOT_EXIST" : {"RetCode" : 8039, "Message" : "Resource not exist" },
	"CHECK_RESOURC_EERROR" : {"RetCode" : 8040, "Message" : "Get an error while check resource " },
	"CHECK_BALANCE_ERROR" : {"RetCode" : 8041, "Message" : "Get an error while check account balance"},
  	//UIMAGE
	"LIST_IMAGE_ERROR": { "RetCode": 8042, "Message": "List image error"},
	"NO_AVAILABLE_IMAGE": { "RetCode": 8043, "Message": "No available image"},

	//UHOST
    "CREATE_UHOST_CPU_STEP_INVALID": {"RetCode" : 8044, "Message" : "CPU Core Count should be divided by two"},
    "CREATE_UHOST_MEMORY_STEP_INVALID": {"RetCode" : 8045, "Message" : "Memory Size should be divded by 2048"},
    "CREATE_UHOST_DISKSPACE_STEP_INVALID": {"RetCode" : 8046, "Message" : "DiskSpace Size should be divided by 10"},
    "CREATE_UHOST_GETNETWORKIDS_FAIL": {"RetCode" : 8047, "Message" : "Get default networkIds fail[%s]"},
    "CREATE_UHOST_NETWORKIDS_EMPTY": {"RetCode" : 8048, "Message" : "NetworkIds are empty"},
    "CREATE_UHOST_BASENETWORKIDS_EMPTY": {"RetCode" : 8049, "Message" : "Base networkId is empty"},
    "CREATE_UHOST_NETWORKID_INVALID": {"RetCode" : 8050, "Message" : "NetworkId[%s] is invalid"},
    "CREATE_UHOST_GETSECURITYGROUPS_FAIL": {"RetCode" : 8051, "Message" : "Get security groups fail[%s]"},
    "CREATE_UHOST_SECURITYGROUPS_EMPTY": {"RetCode" : 8052, "Message" : "Security groups are empty"},
    "CREATE_UHOST_DEFAULT_SECURITYGROUP_EMPTY": {"RetCode" : 8053, "Message" : "Default security group is empty"},
    "CREATE_UHOST_SECURITYGROUP_INVALID": {"RetCode" : 8054, "Message" : "Security groupId [%s] is Invalid"},
    "CREATE_UHOST_CREAERESOURCEID_FAIL": {"RetCode" : 8055, "Message" : "Create resource Id Fail"},
    "CREATE_UHOST_GETIMAGELIST_FAIL": {"RetCode" : 8056, "Message" : "Get image list fail[%s]"},
    "CREATE_UHOST_IMAGELIST_EMPTY": {"RetCode" : 8057, "Message" : "Image list is empty"},
    "CREATE_UHOST_IMAGE_NO_PERMISSION": {"RetCode" : 8058, "Message" : "You don't have image[%s]'s permission"},
    "CREATE_UHOST_ERROR": {"RetCode" : 8059, "Message" : "Allocate Vm Error"},
    "CREATE_UHOST_FAIL": {"RetCode" : 8060, "Message" : "Allocate Vm Failed"},
    "CREATE_UHOST_LOGIN_MODE_ERROR": {"RetCode" : 8061, "Message" : "LoginMode [%s] not support."},
    "RESIZE_UHOST_GET_VMINFO_FAIL": {"RetCode" : 8062, "Message" : "Get vm[%s]'info fail"},
    "RESIZE_UHOST_NO_SUCH_VM": {"RetCode" : 8063, "Message" : "No such vm[%s]"},
    "RESIZE_UHOST_CPU_STEP_INVALID": {"RetCode" : 8064, "Message" : "CPU Core Count should be divided by two"},
    "RESIZE_UHOST_MEMORY_STEP_INVALID": {"RetCode" : 8065, "Message" : "Memory Size should be divded by 2048"},
    "RESIZE_UHOST_DISKSPACE_STEP_INVALID": {"RetCode" : 8066, "Message" : "Disk space should be divided by 10"},
    "RESIZE_UHOST_DISKSPACE_CANNOT_REDUCE": {"RetCode" : 8067, "Message" : "DiskSpace can't reduce"},
    "RESIZE_UHOST_FAIL": {"RetCode" : 8068, "Message" : "Resize vm failed"},
    "RESIZE_UHOST_GET_OSNAME_ERROR": {"RetCode" : 8069, "Message" : "Get image's os name error"},
    "RESIZE_UHOST_OSNAME_EMPTY": {"RetCode" : 8070, "Message" : "Get image  os name error"},
	"ATTACH_UDISK_GET_OBJ_ERROR": {"RetCode": 8071, "Message" : "Get UDisk[%s] obj error"},
	"ATTACH_UDISK_DISK_INUSE_ERROR": {"RetCode": 8072, "Message": "UDisk[%s] in use"},
	"ATTACH_UDISK_GET_INFO_ERROR": {"RetCode": 8073, "Message": "Get UDisk[%s] info error"},
    "RESIZE_UHOST_MEMORY_CANNOT_REDUCE": {"RetCode" : 8074, "Message" : "Memory can't reduce,origin memory is[%d]"},
    "RESIZE_UHOST_CPU_CANNOT_REDUCE": {"RetCode" : 8075, "Message" : "CPU can't reduce "},
	"DETACH_UDISK_GET_OBJ_ERROR": {"RetCode": 8076, "Message" : "Get UDisk[%s] obj error in detach UDisk"},
	"DETACH_UDISK_GET_INFO_ERROR": {"RetCode": 8077, "Message": "Get UDisk[%s] info error in detach UDisk"},
	"ATTACH_UDISK_MOD_OBJ_ERROR": {"RetCode": 8078, "Message" : "Mod Object error while attach UDisk[%s] "},
	"DETACH_UDISK_MOD_OBJ_ERROR": {"RetCode": 8079, "Message" : "Mod Object error while detach UDisk[%s] "},
	"ATTACH_UDISK_RELATE_OBJ_ERROR": {"RetCode": 8080, "Message" : "Relate Object error while attach UDisk[%s] to UHost[%s]"},
	"DETACH_UDISK_RELATE_OBJ_ERROR": {"RetCode": 8081, "Message" : "Relate Object error while detach UDisk[%s] to UHost[%s]"},
	"ATTACH_UDISK_DISRELATE_OBJ_ERROR": {"RetCode": 8082, "Message" : "Disrelate Object error while attach UDisk[%s] to UHost[%s]"},
	"DETACH_UDISK_DISRELATE_OBJ_ERROR": {"RetCode": 8083, "Message" : "Disrelate Object error while detach UDisk[%s] to UHost[%s]"},
	"DETACH_UDISK_DISK_NOT_INUSE_ERROR": {"RetCode": 8084, "Message" : "UDisk[%s] is not in use"},
	"ATTACH_UDISK_DISK_STATUS_ERROR": {"RetCode": 8085, "Message" : "UDisk[%s]'s status is not right "},
	"ATTACH_UDISK_ERROR": {"RetCode": 8086, "Message": "Attach udisk [%s] from [%s] error"},
    "GET_PRICE_GETIMAGELIST_FAIL": {"RetCode" : 8087, "Message" : "Get image list fail"},
    "GET_PRICE_IMAGELIST_EMPTY": {"RetCode" : 8088, "Message" : "Image list is empty"},
    "GET_PRICE_BOOTDISKSPACE_ERROR": {"RetCode" : 8089, "Message" : "BootDiskSpace doesn't match the OS Type"},
    "GET_BUY_PRICE_ERROR": {"RetCode" : 8090, "Message" : "Get an error while get price for UHost instance"},
    "QUERY_IMAGE_ERROR": {"RetCode" : 8091, "Message" : "Get an error while check image [%s] for: %s"},
    "IMAGE_IS_INVALID": {"RetCode" : 8092, "Message" : "Permission deny for Image [%s] "},
    "DELETE_CUSTOM_IMAGE_ERROR": {"RetCode" : 8093, "Message" :"Get an error while delete custom image [%s] for %s"},
    "BIG_DATA_DISKSPACE_CANNOT_RESIZE": {"RetCode" : 8094, "Message" : "Diskspace for big data UHost type cannot resize"},
    "RESOURCE_IS_OVER_QUOTA": {"RetCode" : 8095, "Message" : "You have reached the resource quota"},
    "GET_RESOURCE_BILL_INFO_FAIL": {"RetCode" : 8096, "Message" : "Failed to get bill info for resource"},
    "GET_RESOURCE_BILL_INFO_ERROR": {"RetCode" : 8097, "Message" : "Get an error while get bill info"},
	"TERMINATE_UHOST_INSTANCE_FAIL": { "RetCode": 8098, "Message": "Terminate UHost failed"},
	"GET_IMAGE_LIST_FAIL": { "RetCode": 8099, "Message": "Fail to get image list"},
	"GET_SUBNETWORK_ID_FAIL": { "RetCode": 8100, "Message": "Fail to get subnetwork  id "},
	"GET_SECURITY_GROUP_FAIL": { "RetCode": 8101, "Message": "Fail to get security group"},
	"UPDATE_RESOURCE_STATUS_FAIL": { "RetCode": 8102, "Message": "Fail to update resource status"},
	"UPDATE_RESOURCE_STATUS_ERROR": { "RetCode": 8103, "Message": "Get an error while update resource status"},
	"RESOURCE_BECOME_DUE": { "RetCode": 8104, "Message": "Some of your bill have not been payed"},
	"CPU_PARAMS_RANGE_ERROR": { "RetCode": 8105, "Message": "CPU should be in [1,16]"},
	"MEMORY_PARAMS_RANGE_ERROR": { "RetCode": 8106, "Message": "Memory should be in [2048, 65536]"},
	"DISKSPACE_PARAMS_RANGE_ERROR": { "RetCode": 8107, "Message": "Diskspace should be in [0, 1000]"},
	"SUBMIT_PAYMENT_MODIFY_FAIL": { "RetCode": 8108, "Message": "Submit payment modify fail"},
	"GET_TRIAL_QUOTA_FAIL": { "RetCode": 8109, "Message": "Get quota info for trial fail"},
	"GET_TRIAL_QUOTA_ERROR": { "RetCode": 8110, "Message": "Get quota info for trial error"},
	"TRIAL_PERMISSION_DENY": { "RetCode": 8111, "Message": "Permission denied for your trial of UHost"},
	"CPU_ERROR_TRIAL": { "RetCode": 8112, "Message": "CPU count for trial UHost should be 2"},
	"MEMORY_ERROR_TRIAL": { "RetCode": 8113, "Message": "Memory for trial UHost should be 4096"},
	"COUNT_ERROR_TRIAL": { "RetCode": 8114, "Message": "Count of trial is too large"},
	"TRIAL_RESIZE_DENIED": { "RetCode": 8115, "Message": "Trial UHost should not be resized"},
	"DYNAMIC_PAY_DENY": { "RetCode": 8116, "Message": "Dynamic ChargetType is not available"},
	"BILL_ITEM_OUTDATE": { "RetCode": 8117, "Message": "This Bill item is out of date"},
    "GET_TARGET_UIMAGE_FAILED": {"RetCode": 8118,"Message": "Get target uimage failed,please specify one"},

    "FREE_IPS_TIMEOUT": {"RetCode": 8819},
    "FREE_IPS_ERROR": {"RetCode": 8820},
    "ALLOCATE_IPS_TIMEOUT": {"RetCode": 8821},
    "REGISTER_RESOURCE_ERROR": {"RetCode": 8822},
    "REGISTER_RESOURCE_TIMEOUT": {"RetCode": 8823},
    "QUERY_RESOURCE_BY_ID_ERROR": {"RetCode": 8824,"Message": "Cannot find route for target"},
    "QUERY_RESOURCE_BY_ID_TIMEOUT": {"RetCode": 8825,"Message": "Timeout when query the route"},
    "QUERY_RESOURCE_BY_TYPE_TIMEOUT": {"RetCode": 8826,"Message": "Timeout when choose an available set"},
    "QUERY_RESOURCE_BY_TYPE_ERROR": {"RetCode": 8827,"Message": "Cannot find available set"},
    "REGISTER_RESOURCE_TIMEOUT": {"RetCode": 8828,"Message": "Timeout when register resource"},
    "REGISTER_RESOURCE_ERROR": {"RetCode": 8829,"Message": "Register resource failed"},
    "UNREGISTER_RESOURCE_TIMEOUT": {"RetCode": 8830,"Message": "Unregister resource timeout"},
    "UNREGISTER_RESOURCE_ERROR": {"RetCode": 8831,"Message": "Unregister resource failed"},
    "SCALE_UHOST_TIMEOUT": {"RetCode": 8832,"Message": "Timeout when scale uhost"},
    "SCALE_UHOST_ERROR": {"RetCode": 8833,"Message": "Scale uhost failed"},
    "QUERY_RESOURCE_BY_TYPE_ERROR": { "RetCode": 8834, "Message": "Cannot find target set info"},
    "DESCRIBE_UIMAGE_ERROR": {"RetCode": 8835,"Message": "Describe uimage error"},
    "CREATE_CUSTOM_IMAGE_ERROR": {"RetCode": 8836,"Message": "Create custom uimage failed"},
    "ATTACH_UDISK_TIMEOUT": {"RetCode": 8837,"Message": "Timeout when attach udisk"},
    "ATTACH_UDISK_ERROR": {"RetCode": 8838,"Message": "Attach udisk failed"},
    "DETACH_UDISK_TIMEOUT": {"RetCode": 8839,"Message": "Timeout when detach udisk"},
    "DETACH_UDISK_ERROR": {"RetCode": 8840,"Message": "Detach udisk failed"},

});

// rongyi add: 4000-5000 reserved
_.extend(response_code, {

  //misc 4000
  //deprecated!!, don't use it
  "INTERNEL": {'RetCode': 4000, 'Message': 'internel error'},
  "CHECK_SHARE_BW": {'RetCode': 4001, 'Message': 'check share bandwidth fail'},
  "BW_INPUT": {'RetCode': 4002, 'Message': 'share bandwidth must specify bandwidth to 0'},
  "ID_TO_PRIVATE_IP": {'RetCode': 4003, 'Message': 'get object private ip fail'},
  "PRIVATE_IP_TO_ID": {'RetCode': 4004, 'Message': 'get private ip by resource id fail'},
  "CHANGE_SECURITY_GROUP": {'RetCode': 4005, 'Message': 'change security group fail'},
  "DESCRIBE_VM": {'RetCode': 4006, 'Message': 'get uhost detail fail'},
  "DESCRIBE_VM_COUNT": {'RetCode': 4007, 'Message': 'get vm total number fail'},
  "PERMISSION_SUBNETWORK": {'RetCode': 4008, 'Message': 'you do not have the permission to create/list subnetwork'},
  "SSH_BRIDGE": {'RetCode': 4009, 'Message': 'get ssh bridge fail'},
  "DESCRIBE_VM_EMPTY": {'RetCode': 4010, 'Message': 'vm instance empty'},
  "BW_ZERO": {'RetCode': 4011, 'Message': 'non share bandwidth must not specify bandwidth to 0'},


  // bill 4051
  // in case conflict to other's get bill, so we add a suffix
  "GET_BILL_RY": {'RetCode': 4051, 'Message': 'get bill info fail'},
  "GET_EIP_PRICE": {'RetCode': 4052, 'Message': 'get eip bill info fail'},
  "UPDATE_EIP_BILL": {'RetCode': 4053, 'Message': 'change eip bill fail'},
  "DELETE_EIP_BILL": {'RetCode': 4054, 'Message': 'delete eip bill fail'},
  "BILL_EIP": {'RetCode': 4055, 'Message': 'bill eip fail'},
  "BILL_BW_SHARE": {'RetCode': 4056, 'Message': 'bill share bandwidth fail'},
  "BILL_NO_MONEY": {'RetCode': 4057, 'Message': 'lack of balance'},

  //ulb 4100
  "DESCRIBE_ULB": {'RetCode': 4100, 'Message': 'get ulb detail fail'},
  "ULB_CREATE_ERROR": {'RetCode': 4101, 'Message': 'ulb create fail'},
  "ULB_DELETE_ERROR": {'RetCode': 4102, 'Message': 'ulb delete fail'},
  "ULB_DESCRIBE_ERROR": {'RetCode': 4103, 'Message': 'ulb describe fail'},
  "ULB_UPDATE_ATTRIBUTE_ERROR": {'RetCode': 4104, 'Message': 'ulb update attribute fail'},
  "ULB_BIND_ERROR": {'RetCode': 4105, 'Message': 'ulb bind fail'},
  "ULB_UNBIND_ERROR": {'RetCode': 4106, 'Message': 'ulb unbind fail'},
  "ULB_PORT_IN_USE": {'RetCode': 4107, 'Message': 'ulb port already in use'},
  "ULB_SSL_IN_USE": {'RetCode': 4108, 'Message': 'ulb ssl in use'},
  "ULB_BACKEND_EXIST": {'RetCode': 4109, 'Message': 'ulb backend already exist'},
  "ULB_BACKEND_IN_CS": {'RetCode': 4110, 'Message': 'ulb backend in content switch group'},
  "ULB_SSL_CONTENT_WRONG": {'RetCode': 4111, 'Message': 'ulb ssl content wrong'},

  //vrouter 4151
  "DESCRIBE_VROUTER": {'RetCode': 4151, 'Message': 'get vrouter detail fail'},

  // eip 4200
  "ALLOCATE_EIP": {'RetCode': 4200, 'Message': 'create eip fail'},
  "GET_EIP": {'RetCode': 4201, 'Message': 'get eip list fail'},
  "BIND_EIP": {'RetCode': 4202, 'Message': 'apply eip to resource fail'},
  "UNBIND_EIP": {'RetCode': 4203, 'Message': 'release eip from resource fail'},
  "MODIFY_EIP": {'RetCode': 4204, 'Message': 'modify eip bandwidth fail'},
  "FREE_EIP": {'RetCode': 4205, 'Message': 'free eip fail'},
  "CREATE_EIP_RESOURCE": {'RetCode': 4206, 'Message': 'create eip resource fail'},
  "CREATE_EIP_RESOURCE_QUOTA": {'RetCode': 4207, 'Message': 'create eip resource over quota'},
  "UPDATE_EIP_RESOURCE": {'RetCode': 4208, 'Message': 'update eip resource status fail'},
  "DELETE_EIP_RESOURCE": {'RetCode': 4209, 'Message': 'delete eip resource fail'},
  "EIP_RESOURCE_NOT_EXIST": {'RetCode': 4210, 'Message': 'eip resource not exist'},
  "EIP_NOT_BIND_YET": {'RetCode': 4211, 'Message': 'eip resource not bind to any object'},
  "EIP_IN_USED": {'RetCode': 4212, 'Message': 'eip in used'},
  "EIP_TRIAL_BW_TOO_LARGE": {'RetCode': 4213, 'Message': 'Trial Bandwidth too large'},
  "EIP_TRIAL_QUOTA": {'RetCode': 4213, 'Message': 'eip lack of quota'},
  "MODIFY_EIP_PERMISSION": {'RetCode': 4214, 'Message': 'Trial eip can not be upgraded'},

  // monitor 26000-26999

  "ADD_SITE_PROBE_RULE": {'RetCode': 26000, 'Message': 'Add Site Probe Rule failed.'},
  "DELETE_SITE_PROBE_RULE": {'RetCode': 26010, 'Message': 'Delete Site Probe Rule failed.'},
  "UPDATE_SITE_PROBE_RULE": {'RetCode': 26020, 'Message': 'Update Site Probe Rule failed.'},
  "DESCRIBE_SITE_PROBE_RULE": {'RetCode': 26030, 'Message': 'Describe Site Probe Rule failed.'},
  "ADD_ALARM_RULE": {'RetCode': 26040, 'Message': 'Add Alarm Rule failed.'},
  "ALARM_RULE_PARAM_RANGE_ERROR": {'RetCode': 26041, 'Message': 'Param [%s] range error.'},
  "ALARM_RULE_DUPLICATE": {'RetCode': 26042, 'Message': 'Duplicate alarm rule.'},
  "DELETE_ALARM_RULE": {'RetCode': 26050, 'Message': 'Delete Alarm Rule failed.'},
  "UPDATE_ALARM_RULE": {'RetCode': 26060, 'Message': 'Update Alarm Rule failed.'},
  "DESCRIBE_ALARM_RULE": {'RetCode': 26070, 'Message': 'Describe Alarm Rule failed.'},
  "ADD_CONTACT": {'RetCode': 26080, 'Message': 'Add contact fail.'},
  "DELETE_CONTACT": {'RetCode': 26090, 'Message': 'Delete an contact target fail.'},
  "DELETE_CONTACT_REJECT": {'RetCode': 26091, 'Message': 'Delete rejected: contact in default contact group.'},
  "UPDATE_CONTACT": {'RetCode': 26100, 'Message': 'Update an contact target fail.'},
  "DESCRIBE_CONTACT": {'RetCode': 26110, 'Message': 'Get contacts fail.'},
  "ADD_CONTACT_GROUP": {'RetCode': 26120, 'Message': 'Add contact group fail.'},
  "CONTACT_GROUP_NAME_INVALID": {'RetCode': 26121, 'Message': 'Contact group name is invalid.'},
  "DELETE_CONTACT_GROUP": {'RetCode': 26130, 'Message': 'Delete contact group fail.'},
  "UPDATE_CONTACT_GROUP": {'RetCode': 26140, 'Message': 'Update contact group fail.'},
  "EMPTY_DEFAULT_GROUP": {'RetCode': 26141, 'Message': 'Delete notifier failed, default notification group can not be empty.'},
  "DESCRIBE_CONTACT_GROUP": {'RetCode': 26150, 'Message': 'Get contact group fail.'},
  "NO_CONTACT_GROUP": {'RetCode': 26151, 'Message': 'No contact group found.'},
  "GET_METRIC": {'RetCode': 26160, 'Message': 'Get metric statistic fail.'},
  "METRIC_NOT_EXIST": {'RetCode': 26161, 'Message': 'Metric not exist.'},
  "TIME_OUT_OF_RANGE": {'RetCode': 26162, 'Message': 'Time out of range. The range of request time should be less than 16 days(3600*24*16).'},
  "GET_AGENT_CONF": {'RetCode': 26170, 'Message': 'Get agent configuration fail.'},
  "ILLEGAL_LOCAL_IP": {'RetCode': 26171, 'Message': 'Illegal local ip address.'},
  "GET_ID_BY_IP": {'RetCode': 26172, 'Message': 'Get uuid fail.'},
  "GET_METRIC_OVERVIEW": {'RetCode': 26180, 'Message': 'Get metric overview fail.'},
  "GET_VSERVER": {'RetCode': 26181, 'Message': 'Get vserver info fail.'},
  "GET_SERVER": {'RetCode': 26182, 'Message': 'Get server info fail.'},
  "GET_ALARM_RECORD": {'RetCode': 26190, 'Message': 'Get alarm record fail.'},

  //告警模板相关
  "ADD_ALARM_TEMPLATE": {'RetCode': 26200,  'Message': 'Add alarm template fail.'},
  "ADD_ALARM_TEMPLATE_RULE": {'RetCode': 26210,  'Message': 'Add alarm template rule fail.'},
  "BIND_ALARM_TEMPLATE": {'RetCode': 26220,  'Message': 'Bind alarm template fail.'},
  "UNBIND_ALARM_TEMPLATE": {'RetCode': 26230,  'Message': 'Unbind alarm template fail.'},
  "UPDATE_ALARM_TEMPLATE": {'RetCode': 26240,  'Message': 'Update alarm template fail.'},
  "OPERATE_ON_DEFAULT_ALARM_TEMPLATE": {'RetCode': 26241,  'Message': 'Cannot modify or delete default alarm template.'},
  "GET_ALARM_TEMPLATE_LIST": {'RetCode': 26250,  'Message': 'Get alarm template list fail.'},
  "DESCRIBE_ALARM_TEMPLATE": {'RetCode': 26260,  'Message': 'Describe alarm template fail.'},
  "DELETE_ALARM_TEMPLATE": {'RetCode': 26270,  'Message': 'Delete alarm template fail.'},
  "UPDATE_ALARM_TEMPLATE_RULE": {'RetCode': 26280,  'Message': 'Update alarm template rule fail.'},
  "DELETE_ALARM_TEMPLATE_RULE": {'RetCode': 26290,  'Message': 'Delete alarm template rule fail.'},
  "GET_ALARM_TEMPLATE_BOUND_RESOURCE": {'RetCode': 26300,  'Message': 'Get alarm template bound resource fail.'},
  "GET_RESOURCE_ALARM_TEMPLATE": {'RetCode': 26310,  'Message': 'Get resource alarm template fail.'},

  "UMON_NO_VALID_DBSERVICE": {'RetCode': 26900, 'Message': 'No valid db servcie.'},
  "UMON_RESOURCE_TYPE_NOT_SUPPORT": {'RetCode': 26901, 'Message': 'Resource type not support:'},
  "UMON_RESOURCE_NOT_EXIST": {'RetCode': 26902, 'Message': 'Resource not exist:'},
  "UMON_CHECK_RESOURCE_ERROR": {'RetCode': 26903, 'Message': 'Check Resource error:'},
  "UMON_MISSING_BACKEND_RESPONSE": {'RetCode': 26904, 'Message': 'Missing backend response.'},
  "UMON_GET_ALL_EXTEND_INFO": {'RetCode': 26905, 'Message': 'Get all extend info fail.'},
  "UMON_GET_RESOURCE_ERROR": {'RetCode': 26906, 'Message': 'Get resource info from uresource failed.'},
  "UMON_MISSING_RESPONSE_FROM_RESOURCE_SYSTEM": {'RetCode': 26907, 'Message': 'Missing response from the resource system.'},
  
  // userlog 18000-18099
  "DESCRIBE_USER_OPERATION_HISTORY": {'RetCode': 18000, 'Message': 'describe user operation history fail.'},
  "ULOG_MISSING_BACKEND_RESPONSE": {'RetCode': 18001, 'Message': 'Missing backend response.'},

  // usmsg 18100-18999
  "SEND_SMS": {'RetCode': 18100, 'Message': 'Send sms fail.'},
  "USMS_CONTENT_TOO_LONG": {'RetCode': 18101, 'Message': 'Sms content too long.'},
  "USMS_SMS_NOT_ENOUGH": {'RetCode': 18102, 'Message': 'Remain Sms amount is not enough.'},
  "USMS_SMS_NO_LEFT": {'RetCode': 18103, 'Message': 'Remain Sms amount is zero.'},
  "USMS_PHONE_OR_CONTENT_ERROR": {'RetCode': 18104, 'Message': '1.Phone number illegal or content is empty. 2.Channel abnormality'},
  "USMS_KEYWORD_CHECKFAIL": {'RetCode': 18105, 'Message': 'Content contains forbidden keyword.'},
  "USMS_SENDSMS_TIMEOUT": {'RetCode': 18106, 'Message': 'Send sms timeout.'},
  "USMS_PHONELIST_EMPTY": {'RetCode': 18107, 'Message': 'The phone list is empty.'},
  "USMS_PHONE_INVALID": {'RetCode': 18108, 'Message': 'Invalid phone number in phone list.'},
  "SET_SMS_SIGNATURE": {'RetCode': 18110, 'Message': 'Set sms signature fail.'},
  "INVALID_CHAR_IN_SIGNATURE": {'RetCode': 18111, 'Message': 'Invalid characters in signature.'},
  "DESCRIBE_SMS_STAT": {'RetCode': 18120, 'Message': 'Get sms statistics fail.'},
  "DESCRIBE_SMS_CONFIG": {'RetCode': 18130, 'Message': 'Get sms configuration fail.'},
  "CHECK_KEY_WORD": {'RetCode': 18140, 'Message': 'Get sms forbidden word fail.'},
  "BUY_SMS": {'RetCode': 18150, 'Message': 'Buy sms fail.'},
  "USMS_DEDUCT_ERROR": {'RetCode': 18151, 'Message': 'Fee deduction fail.'},
  "USMS_DELIVER_RESOURCE_ERROR": {'RetCode': 18152, 'Message': 'Deliver resource fail.'},
  "DESCRIBE_SMS_RECORD": {'RetCode': 18160, 'Message': 'Get sms record fail.'},
  "DESCRIBE_SMS_PRICE": {'RetCode': 18170, 'Message': 'Get sms price fail.'},

  "USMSG_MISSING_BACKEND_RESPONSE": {'RetCode': 18900, 'Message': 'Missing backend response.'},

  // usns
  "USNS_MISSING_BACKEND_RESPONSE": {'RetCode': 19500, 'Message': 'Missing backend response.'},
  
  "ADD_TOPIC_GROUP": {'RetCode': 19550, 'Message': 'Add topic failed.'},
  "DELETE_TOPIC_GROUP": {'RetCode': 19560, 'Message': 'Delete topic failed.'},
  "MODIFY_TOPIC_GROUP": {'RetCode': 19570, 'Message': 'Modify topic failed.'},
  "GET_TOPIC_GROUP": {'RetCode': 19580, 'Message': 'Get topic failed.'},
  "CHECK_TOPIC_GROUP": {'RetCode': 19590, 'Message': 'Check topic failed.'},
  "GET_ALL_TOPIC": {'RetCode': 19600, 'Message': 'Get all topic failed.'},

  //security group 4351
  "GET_SECURITY_GROUP": {'RetCode': 4351, 'Message': 'get security group fail'},
  "UPDATE_SECURITY_GROUP": {'RetCode': 4352, 'Message': 'update security group fail'},
  "CREATE_SECURITY_GROUP": {'RetCode': 4353, 'Message': 'create security group fail'},
  "TERMINATE_SECURITY_GROUP": {'RetCode': 4354, 'Message': 'terminate security group fail'},
  "SECURITY_GROUP_NOT_SUPPORT": {'RetCode': 4356, 'Message': 'current security group does not support this type of resource'},
  "SECURITY_GROUP_PERMISSION": {'RetCode': 4357, 'Message': 'You do not have permission to do this operationl, using major account instead'},


  //subnetwork 4400
  "GET_SUBNETWORK": {'RetCode': 4400, 'Message': 'get subnetwork fail'},



  //bandwidth package 4451
  "DESCRIBE_BW_PACKAGE": {'RetCode': 4451, 'Message': 'error: fail to get bw info'},
  "CREATE_BW_RESOURCE": {'RetCode': 4452, 'Message': 'error: fail to creatre bw resource'},
  "CREATE_BW_PACK": {'RetCode': 4453, 'Message': 'error: fail to creatre bw package'},
  "BILL_BW_PACK": {'RetCode': 4454, 'Message': 'error: fail to bill bw package'},
  "UPDATE_BW_RESOURCE": {'RetCode': 4455, 'Message': 'error: fail to update bw package resource'},
  "DESCRIBE_BW_RESOURCE": {'RetCode': 4456, 'Message': 'error: fail to get bw package resource'},
  "FREE_BW_PACKAGE": {'RetCode': 4457, 'Message': 'error: fail to delete bw package'},
  "FREE_BW_RESOURCE": {'RetCode': 4458, 'Message': 'error: fail to delete bw package resource'},
  "RECORD_BILL_BW_PACK": {'RetCode': 4459, 'Message': 'error: fail to save bill bw package into unetwork backend'},
  "SHOW_BILL_BW_PACK": {'RetCode': 4460, 'Message': 'error: fail to get bw package price'},
  "CANCEL_BILL_BW_PACK": {'RetCode': 4461, 'Message': 'error: fail to cancel bw package bill'},



  //vip
  "DESCRIBE_VIP": {'RetCode': 4501, 'Message': 'error: fail to get vip info'},
  "CREATE_VIP": {'RetCode': 4502, 'Message': 'error: fail to create vip info'},
  "RELEASE_VIP": {'RetCode': 4503, 'Message': 'error: fail to delete vip info'},
  "VIP_PERMISSION": {'RetCode': 4504, 'Message': 'error: have no permission'},

  //bwshare
  "CREATE_BW_SHARE": {'RetCode': 4504, 'Message': 'error: fail to create bwshare info'},
  "DELETE_BW_SHARE": {'RetCode': 4505, 'Message': 'error: fail to delete bwshare info'},
  "RESIZE_BW_SHARE": {'RetCode': 4506, 'Message': 'error: fail to resize bwshare info'},
  "BW_SHARE_RESOURCE_NOT_FOUND": {'RetCode': 4507, 'Message': 'error: fail to get bwshare resource info'},
  "BW_SHARE_PERMISSION": {'RetCode': 4508, 'Message': 'error: do not have permission to do this operation'},
});
// rongyi add end

// organization 12000-12999
_.extend(response_code, {
    'DESCRIBE_ORGANIZATION_ERROR': {'RetCode': 12000, 'Message': 'Get organiation list error'},
    'CREATE_ORGANIZATION_ERROR': {'RetCode': 12001, 'Message': 'Create organiation error'},
    'MODIFY_ORGANIZATION_ERROR': {'RetCode': 12002, 'Message': 'Modify organiation error'},
    'TERMINATE_ORGANIZATION_ERROR': {'RetCode': 12003, 'Message': 'Terminate organiation error'},
    'GET_ORGANIZATION_BY_PARENT_ERROR': {'RetCode': 12004, 'Message': 'Get organiation info error'},
    'GET_ORGANIZATION_INFO_COUNT_ERROR': {'RetCode': 12005, 'Message': 'Get organiation info count error'},
    'CHECK_HIGHER_ORGANIZATION_ERROR': {'RetCode': 12006, 'Message': 'Organization permission error'},
    'TERMINATE_ACCOUNT_FROM_ORGANIZATION_ERROR': {'RetCode': 12007, 'Message': 'Terminate account from organization error'},
    'ORGANIZATION_NOT_EMPTY_ERROR': {'RetCode':12008, 'Message': 'Organization has resource or manager'},
    'CHECK_EMAIL_ERROR': {'RetCode':12009, 'Message': 'Check email error'},
});

// account 11000-11999
_.extend(response_code, {
    'DESCRIBE_ACCOUNT_ERROR': {'RetCode': 11010, 'Message': 'Get account list error'},
    'CREATE_ACCOUNT_ERROR': {'RetCode': 11011, 'Message': 'Create account error'},
    'MODIFY_ACCOUNT_ERROR': {'RetCode': 11012, 'Message': 'Modify account error'},
    'TERMINATE_ACCOUNT_ERROR': {'RetCode': 11013, 'Message': 'Terminate account error'},
    'GET_ACCOUNT_ERROR': {'RetCode': 11014, 'Message': 'Get account error'},
    'SEND_VERIFICATION_ERROR':{'RetCode': 11015, 'Message': 'Send verification error'},
    'CHECK_VERIFICATION_ERROR':{'RetCode': 11016, 'Message': 'Check verification error'},
    'EMAIL_EXIST_ERROR': {'RetCode': 11017, 'Message': 'Email already exist'},
});

// resource 128000-128999
_.extend(response_code, {
    'DESCRIBE_RESOURCE_ERROR': {'RetCode': 128020, 'Message': 'Get resource List error'},
    'CHANGE_ORGANIZATION_ERROR': {'RetCode': 128021, 'Message': 'Change resource organization error'},
});

//jjt add 5000 - 6000
_.extend(response_code, {
    'CREATE_VPN_RESOURCE_ERROR':{'RetCode': 5001, 'Message':'Get resource id error'},
    'CREATE_VPN_RESOURCE_QUOTA':{'RetCode': 5002, 'Message':'Get resource id quota error'},
    'CREATE_VPN_UNET_ERROR':{'RetCode': 5003, 'Message':'create vpn unet return [%s]'},
    'UPDATE_VPN_RESOURCE':{'RetCode': 5004, 'Message':'update vpn resource failed'},
    'DESCRIBE_VPN_ERROR':{'RetCode': 5005, 'Message':'describe unet response is null or size error'},
    'DESCRIBE_VPN_RET_ERROR':{'RetCode': 5006, 'Message':'unet ret code != 0 [%s]'},
    'DESCRIBE_VPN_UBILL_RET_ERROR':{'RetCode': 5007, 'Message':'ubil ret code != 0 [%s]'},
    'GET_VPN_CONF_ERROR':{'RetCode': 5008, 'Message':'unet return failed '},
    'DELETE_VPN_RESOURCE_ERROR':{'RetCode': 5009, 'Message':'delete vpn resource error '},
    'DELETE_VPN_RESOURCE_RET_ERROR':{'RetCode': 5010, 'Message':'delete vpn resource return error [%s]'},
    'DELETE_VPN_UBILL_ERROR':{'RetCode': 5011, 'Message':'delete vpn ubill error [%s] '},
    'DELETE_VPN_UNET_ERROR':{'RetCode': 5012, 'Message':'delete vpn unet error [%s] '},
    'UPDATE_VPN_UBILL_ERROR':{'RetCode': 5013, 'Message':'update vpn ubill error [%s] '},
    'UPDATE_VPN_UNET_ERROR':{'RetCode': 5014, 'Message':'update vpn unet error [%s] '},
    'UPDATE_VPN_LOCALNET_ERROR':{'RetCode': 5014, 'Message':'update vpn localnet error [%s] '},
    'GET_VPN_PRICE_ERROR':{'RetCode': 5015, 'Message':'get vpn price [%s] '},
    'CREATE_ERROR':{'RetCode': 5016, 'Message':'create error [%s] '},
    'DELETE_ERROR':{'RetCode': 5017, 'Message':'delete error [%s] '},
    'UPDATE_ERROR':{'RetCode': 5018, 'Message':'update error [%s] '},
    'DESCRIBE_ERROR':{'RetCode': 5019, 'Message':'describe error [%s] '},
    'BIND_ERROR':{'RetCode': 5020, 'Message':'bind error [%s] '},
    'UNBIND_ERROR':{'RetCode': 5021, 'Message':'unbind error [%s] '},
    'UNET_SUBNET_OVERLAP':{'RetCode': 5022, 'Message':'subnet ip addr overlap'},
    'UNET_SUBNET_FORMAT_WRONG':{'RetCode': 5023, 'Message':'subnet format wrong'},
    'UNET_SUBNET_NOT_EMPTY':{'RetCode': 5024, 'Message':'subnet not empty'},
    'UNET_SUBNET_DEFAULT':{'RetCode': 5025, 'Message':'try to del defualt subnet'},
    'UNET_RESOURCE_IN_OTHER_SUBNET':{'RetCode': 5026, 'Message':'resource in other subnet'},
    'UNET_VROUTER_TO_DEFAULT_SUBNET':{'RetCode': 5027, 'Message':'try to bind vrouter to default subnet'},
    'UNET_SUBNET_HAS_VROUTER':{'RetCode': 5028, 'Message':'subnet has vrouter'},
    'UNET_NOT_ADMIN_ACCOUNT':{'RetCode': 5029, 'Message':'not admin account'},
});

//ufile(us3) error code
_.extend(response_code, {
	'DUPLICATE_BUCKET_ERROR': { 'RetCode': 15000, 'Message': 'duplicate bucket name'},
	'INVALID_BUCKET_NAME_ERROR': { 'RetCode': 15001, 'Message': 'invalid bucket name'},
	'MISSING_PARAMETER_ERROR': { 'RetCode': 15002, 'Message': 'miss [%s] argument'},
	'TYPE_OPTION_ERROR': { 'RetCode': 15003, 'Message': 'invalid \'Type\''},
	'GET_SERVICE_ERROR': { 'RetCode': 15004, 'Message': 'internal error'},
	'AMQP_RESPONSE_ERROR': { 'RetCode': 15005, 'Message': '%s'},
	'TCP_RESPONSE_ERROR': { 'RetCode': 15006, 'Message': '%s'},
	'RET_CODE_ERROR': { 'RetCode': 15007, 'Message': '%s'},
	'INVAILID_DOMAIN_NAME_ERROR': { 'RetCode': 15008, 'Message': 'invalid domain name'},
	'DUPLICATE_DOMAIN_ERROR': { 'RetCode': 15009, 'Message': 'duplicate domain name'},
	'BUCKET_NOT_FOUND_ERROR': { 'RetCode': 15010, 'Message': 'bucket not found'},
	'BUCKET_QUOTA_OVER_RUN_ERROR': { 'RetCode': 15011, 'Message': 'bucket quota over run'},
	'UFILE_CREATE_UCDN_ERROR': { 'RetCode': 15012, 'Message': 'internal error'},
	'UFILE_DESCRIBE_UCDN_ERROR': { 'RetCode': 15013, 'Message': 'internal error'},
	'NOW_UNDELETABLE_UCDN_ERROR': { 'RetCode': 15014, 'Message': 'bucket removable later'},
});

//udb 7000-8000
_.extend(response_code, {
    "RESTART_UDB_INSTANCE_ERROR": {'RetCode': 7005, 'Message': 'restart error'},
    "STOP_UDB_INSTANCE_ERROR": {'RetCode': 7006, 'Message': 'stop error'},
    "START_UDB_INSTANCE_ERROR": {'RetCode': 7007, 'Message': 'start error'},
    "CREATE_UDB_INSTANCE_ERROR": {'RetCode': 7008, 'Message': 'create error'}, // 'allocate db error'
    "DESCRIBE_UDB_INSTANCE_ERROR": {'RetCode': 7009, 'Message': 'describe error'}, // 'desc or list db error'
    "UPDATE_UDB_PARAM_GROUP_ERROR": {'RetCode': 7010, 'Message': 'update param group error'}, // 'update param group kv error'
    "DESCRIBE_UDB_PARAM_GROUP_ERROR": {'RetCode': 7011, 'Message': 'describe param group error'}, // ‘get or list param group error'
    "CHANGE_UDB_PARAM_GROUP_ERROR": {'RetCode': 7012, 'Message': 'change param group error'}, // 'change config error'
    "CLEAR_UDB_LOG_ERROR": {'RetCode': 7013, 'Message': 'clear log error'},
    "DESCRIBE_UDB_BACKUP_ERROR": {'RetCode': 7014, 'Message': 'describe backup error'}, // 'list backup error'
    "DELETE_UDB_BACKUP_ERROR": {'RetCode': 7015, 'Message': 'delete backup error'},
    "EDIT_UDB_BACKUP_BLACKLIST_ERROR": {'RetCode': 7016, 'Message': 'edit backup blacklist error'},
    "DESCRIBE_UDB_BACKUP_BLACKLIST_ERROR": {'RetCode': 7017, 'Message': 'describe backup blacklist error'}, // 'get backup blacklist error'
    "MODIFY_UDB_INSTANCE_NAME_ERROR": {'RetCode': 7019, 'Message': 'modify name error'}, // 'rename db error'
    "CREATE_UDB_REPLICATION_INSTANCE_ERROR": {'RetCode': 7020, 'Message': 'create error'}, // 'make replica db error'
    "CREATE_UDB_SLAVE_ERROR": {'RetCode': 7021, 'Message': 'create error'}, // 'create slave error'
    "BACKUP_UDB_INSTANCE_ERROR": {'RetCode': 7022, 'Message': 'backup error'}, // 'backup db error'
    "PROMOTE_UDB_SLAVE_ERROR": {'RetCode': 7023, 'Message': 'promote slave error'},
    "CREATE_UDB_HA_ERROR": {'RetCode': 7024, 'Message': 'create error'}, // 'make ha error'
    "DESCRIBE_UDB_INSTANCE_STATE_ERROR": {'RetCode': 7025, 'Message': 'describe state error'}, // 'get db state error'
    "DESCRIBE_UDB_HA_STATE_ERROR": {'RetCode': 7026, 'Message': 'describe state error'}, // 'get ha state error'
    "MODIFY_UDB_HA_NAME_ERROR": {'RetCode': 7027, 'Message': 'modify name error'}, // 'rename ha error'
    "RECOVER_UDB_HA_ERROR": {'RetCode': 7028, 'Message': 'recover error'}, // 'recover udb ha error'
    "DESCRIBE_UDB_HA_ERROR": {'RetCode': 7029, 'Message': 'describe error'}, // 'desc or list ha error'
    "DELETE_UDB_INSTANCE_ERROR": {'RetCode': 7031, 'Message': 'delete error'},
    "DELETE_UDB_HA_ERROR": {'RetCode': 7032, 'Message': 'delete error'}, // 'delete ha error'
    "DESCRIBE_UDB_HA_CANDIDATE_MASTER_ERROR": {'RetCode': 7033, 'Message': 'describe error'}, // 'list ha candidate master error'
    "DESCRIBE_UDB_HA_CANDIDATE_SLAVE_ERROR": {'RetCode': 7034, 'Message': 'describe error'}, // 'list ha candidate slave error'
    "DELETE_UDB_PARAM_GROUP_ERROR": {'RetCode': 7036, 'Message': 'delete param group error'}, // 'delete param group error'
    "DESCRIBE_UDB_INSTANCE_PRICE_ERROR": {'RetCode': 7037, 'Message': 'describe error'}, // 'describe price error'
    "UPLOAD_UDB_PARAM_GROUP_ERROR": {'RetCode': 7038, 'Message': 'upload error'}, // 'upload param group error'
    "COUNT_UDB_ERROR": {'RetCode': 7039, 'Message': 'describe error'}, // 'count db error'
    "DESCRIBE_UDB_BACKUP_LOCATION_ERROR": {'RetCode': 7041, 'Message': 'describe backup location error'}, // 'locate backup error'
    "COUNT_UDB_BACKUP_ERROR": {'RetCode': 7042, 'Message': 'describe backup error'}, // 'count backup error'
    "COUNT_UDB_PARAM_GROUP_ERROR": {'RetCode': 7043, 'Message': 'describe param group error'}, // 'count param group error'
    "CREATE_UDB_RESOURCE_ERROR": {'RetCode': 7044, 'Message': 'create error'}, // 'create resource error'
    "CREATE_UDB_BILL_ERROR": {'RetCode': 7045, 'Message': 'create error'}, // 'create db bill error'
    "UPDATE_RESOURCE_STATUS_ERROR": {'RetCode': 7046, 'Message': 'create error'}, // 'update resource status error'
    "DESCRIBE_UDB_BILL_INFO_ERROR": {'RetCode': 7047, 'Message': 'describe error'}, // 'get db bill info error'
    "UDB_CHECK_PERMISSION_ERROR": {'RetCode': 7048, 'Message': 'permission error'}, // 'check resource permission error'
    "DELETE_UDB_BILL_ERROR": {'RetCode': 7049, 'Message': 'delete error'}, // 'delete db bill error'
    "DELETE_UDB_RESOURCE_ERROR": {'RetCode': 7050, 'Message': 'delete error'}, // 'delete resource error'
    "CREATE_UDB_PARAM_GROUP_ERROR": {'RetCode': 7054, 'Message': 'create param group error'},
    "DESCRIBE_SRC_UDB_INSTANCE_ERROR": {'RetCode': 7055, 'Message': 'describe error'}, // 'desc or list src db error'
    "TRIAL_UDB_ERROR": {'RetCode': 7056, 'Message': 'create error'}, // 'trial error'
    "DELETE_EXPIRED_UDB_ERROR": {'RetCode': 7057, 'Message': 'delete error'}, // 'delete expired db error'
    "CREATE_UDB_RESOURCE_QUOTA_ERROR":{'RetCode': 7058, 'Message':'over quota error'}, // 'create resource id quota error'
    "UDB_LACK_OF_BALANCE":{'RetCode': 7059, 'Message':'lack of balance'},
    "DESCRIBE_UDB_TYPE_ERROR": {'RetCode': 7060, 'Message': 'describe error'}, // 'list factory type error'
    "UDB_HOURLY_BILLING_PRIVILEGES_ERROR": {'RetCode': 7061, 'Message': 'create error'}, // 'no hour permission error'
    "DELETE_UDB_MASTER_INSTANCE_ERROR": {'RetCode': 7062, 'Message': 'delete error'}, // 'delete master db error'
    "PARAM_GROUP_CONTENT_ERROR": {'RetCode': 7063, 'Message': 'upload error'}, // 'upload invalid param group content'
});

// ubs error code 17000-17999
_.extend(response_code, {
    'CREATE_UDISK_ERROR': { 'RestCode': 17000, 'Message': 'create udisk error'},
    'CLONE_UDISK_ERROR': { 'RestCode': 17005, 'Message': 'clone udisk error'},
    'SNAPSHOT_UDISK_ERROR': { 'RestCode': 17010, 'Message': 'create snapshot error'},
    'RESIZE_UDISK_ERROR': { 'RestCode': 17015, 'Message': 'resize udisk error'},
    'DELETE_UDISK_ERROR': { 'RestCode': 17020, 'Message': 'delete udisk error'},
    'DELETE_SNAPSHOT_ERROR': { 'RestCode': 17025, 'Message': 'delete snapshot  error'},
    'NOT_ENOUGH_SPACE_ERROR': { 'RestCode': 17030, 'Message': 'no enough space'},
    'UDISK_ID_NOT_EXIST_ERROR': { 'RestCode': 17035, 'Message': 'udisk id is not exist'},
    'SNAPSHOT_ID_NOT_EXIST_ERROR': { 'RestCode': 17040, 'Message': 'snapshot id is not exist'},
});



//CMDB
_.extend(response_code,{
    'CREATE_SERVER_ERROR': {'RetCode': 27000,'Message':'create server error'},
    'JSONPARSE_ERROR': {'RetCode':27001,'Message':'json parse error'}
});
