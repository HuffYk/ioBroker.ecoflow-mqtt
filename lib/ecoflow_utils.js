const protobuf = require('protobufjs');
const https = require('https');

const protoSource = `
syntax = "proto3";
message inverter_heartbeat {
    optional uint32 invErrCode = 1;
    optional uint32 invWarnCode = 3;
    optional uint32 pv1ErrCode = 2;
    optional uint32 pv1WarnCode = 4;
    optional uint32 pv2ErrCode = 5;
    optional uint32 pv2WarningCode = 6;
    optional uint32 batErrCode = 7;
    optional uint32 batWarningCode = 8;
    optional uint32 llcErrCode = 9;
    optional uint32 llcWarningCode = 10;
    optional uint32 pv1Status = 11;
    optional uint32 pv2Status = 12;
    optional uint32 batStatus = 13;
    optional uint32 llcStatus = 14;
    optional uint32 invStatus = 15;
    optional int32 pv1InputVolt = 16;
    optional int32 pv1OpVolt = 17;
    optional int32 pv1InputCur = 18;
    optional int32 pv1InputWatts = 19;
    optional int32 pv1Temp = 20;
    optional int32 pv2InputVolt = 21;
    optional int32 pv2OpVolt = 22;
    optional int32 pv2InputCur = 23;
    optional int32 pv2InputWatts = 24;
    optional int32 pv2Temp = 25;
    optional int32 batInputVolt = 26;
    optional int32 batOpVolt = 27;
    optional int32 batInputCur = 28;
    optional int32 batInputWatts = 29;
    optional int32 batTemp = 30;
    optional uint32 batSoc = 31;
    optional int32 llcInputVolt = 32;
    optional int32 llcOpVolt = 33;
    optional int32 llcTemp = 34;
    optional int32 invInputVolt = 35;
    optional int32 invOpVolt = 36;
    optional int32 invOutputCur = 37;
    optional int32 invOutputWatts = 38;
    optional int32 invTemp = 39;
    optional int32 invFreq = 40;
    optional int32 invDcCur = 41;
    optional int32 bpType = 42;
    optional int32 invRelayStatus = 43;
    optional int32 pv1RelayStatus = 44;
    optional int32 pv2RelayStatus = 45;
    optional uint32 installCountry = 46;
    optional uint32 installTown = 47;
    optional uint32 permanentWatts = 48;
    optional uint32 dynamicWatts = 49;
    optional uint32 supplyPriority = 50;
    optional uint32 lowerLimit = 51;
    optional uint32 upperLimit = 52;
    optional uint32 invOnOff = 53;
    optional uint32 wirelessErrCode = 54;
    optional uint32 wirelessWarnCode = 55;
    optional uint32 invBrightness = 56;
    optional uint32 heartbeatFrequency = 57;
    optional uint32 ratedPower = 58;
    optional int32 batChargingTime = 59;
    optional int32 batDischargingTime = 60;
	optional int32 feedPriority = 61;
}
message InverterHeartbeat2 {
	optional int32 pv1_active_1 = 1; //pv1 off/on?
	optional int32 pv1_status_2 = 2; //status pv1
	optional int32 pv2_active_3 = 3; //pv2 off/on?
	optional int32 pv2_status_4 = 4; //status pv2
	optional int32 X_Unknown_5 = 5;
	optional int32 status_6 = 6; //status
	optional int32 upperLimit = 7;
	optional int32 lowerLimit = 8;
	optional int32 status_9 = 9; //status 48->4096
	optional int32 status_10 = 10; //status
	optional int32 X_Unknown_11 = 11;
	optional int32 baseLoad = 12;
	optional int32 powerPlugsPos = 13; //stream power to plugs positive
	optional int32 X_Unknown_14 = 14;
	optional int32 X_Unknown_15 = 15; //power?
	optional int32 X_Unknown_16 = 16;
	optional int32 X_Unknown_17 = 17;
	optional int32 X_Unknown_18 = 18;
	optional int32 X_Unknown_19 = 19;
	optional int32 X_Unknown_20 = 20;
	optional int32 X_Unknown_21 = 21;
	optional int32 X_Unknown_22 = 22;
	optional int32 X_Unknown_23 = 23;
	optional int32 X_Unknown_24 = 24; //disch/chargeTime
	optional int32 X_Unknown_25 = 25;
	optional int32 X_Unknown_26 = 26;
	optional int32 X_Unknown_27 = 27; //disch/chargeTime
	optional int32 X_Unknown_28 = 28;
	optional int32 X_Unknown_29 = 29;
	optional int32 X_Unknown_30 = 30;
	optional int32 X_Unknown_31 = 31;
	optional int32 uptime = 32;
	optional int32 X_Unknown_33 = 33; 
	optional int32 X_Unknown_34 = 34;
	optional int32 X_Unknown_35 = 35;
	optional int32 X_Unknown_36 = 36;
	optional int32 X_Unknown_37 = 37;
	optional int32 X_Unknown_38 = 38;
	optional int32 X_Unknown_39 = 39;
	optional int32 X_Unknown_40 = 40;
	optional int32 X_Unknown_41 = 41;
	optional int32 X_Unknown_42 = 42;
	optional int32 X_Unknown_43 = 43;
	optional int32 plugsConn_44 = 44; // plugs connected for dynamic watt
	optional int32 gridWatt_45 = 45;
	optional int32 powerPlugsNeg = 46; // stream power to plugs negative
	optional int32 X_Unknown_47 = 47;
	optional int32 unixtime_48 = 48; // Anfangszeit history werte?
	optional int32 X_Unknown_49 = 49;
	optional int32 unixtime_50 = 50;
	optional int32 X_Unknown_51 = 51; //letzte Zeit history?
	optional int32 wifiRssi = 52; //wifiRssi
 }
message permanent_watts_pack
{
    optional uint32 permanent_watts = 1;
}

message supply_priority_pack
{
    optional uint32 supply_priority = 1;
}

message feed_priority_pack
{
    optional uint32 supply_priority = 1;
}
message bat_lower_pack
{
    optional int32 lower_limit = 1;
}

message bat_upper_pack
{
    optional int32 upper_limit = 1;
}


message PowerItem
{
    optional uint32 timestamp = 1;
    optional sint32 timezone = 2;
    optional uint32 inv_to_grid_power = 3;
    optional uint32 inv_to_plug_power = 4;
    optional int32 battery_power = 5;
    optional uint32 pv1_output_power = 6;
    optional uint32 pv2_output_power = 7;
}

message PowerPack
{
    optional uint32 sys_seq = 1;
    repeated PowerItem sys_power_stream = 2;
}

message EnergyItem
{
    optional uint32 timestamp = 1;
    optional uint32 watth_type = 2;
    repeated uint32 watth = 3;
}

message EnergyPack
{
    optional uint32 sys_seq = 1;
    repeated EnergyItem sys_energy_stream = 2;
}


message EnergyTotalReport
{
    optional uint32 watth_seq = 1;
    optional EnergyItem watth_item = 2;
}

message BatchEnergyTotalReport
{
    optional uint32 watth_seq = 1;
    repeated EnergyItem watth_item = 2;
}

message EnergyTotalReportAck {
	optional uint32 result = 1;
	optional uint32 watth_seq = 2;
	optional uint32 watth_type = 3;
  }

message PowerAckPack
{
    optional uint32 sys_seq = 1;
}

message node_massage
{
    optional string sn = 1;
    optional bytes mac = 2;
}

message mesh_child_node_info
{
    optional uint32 topology_type = 1;
    optional uint32 mesh_protocol = 2;
    optional uint32 max_sub_device_num = 3;
    optional bytes parent_mac_id = 4;
    optional bytes mesh_id = 5;
    repeated node_massage sub_device_list = 6;
}

message Header
{
    optional bytes pdata = 1;
    optional int32 src = 2;
    optional int32 dest = 3;
    optional int32 d_src= 4;
    optional int32 d_dest = 5;
    optional int32 enc_type = 6;
    optional int32 check_type = 7;
    optional int32 cmd_func = 8;
    optional int32 cmd_id = 9;
    optional int32 data_len = 10;
    optional int32 need_ack = 11;
    optional int32 is_ack = 12;
    optional int32 seq = 14;
    optional int32 product_id = 15;
    optional int32 version = 16;
    optional int32 payload_ver = 17;
    optional int32 time_snap = 18;
    optional int32 is_rw_cmd = 19;
    optional int32 is_queue = 20;
    optional int32 ack_type= 21;
    optional string code = 22;
    optional string from = 23;
    optional string module_sn = 24;
    optional string device_sn = 25;
}

message HeaderMessage {
	repeated Header header = 1;
}

message EventRecordItem {
	optional uint32 timestamp = 1;
	optional uint32 sys_ms = 2;
	optional uint32 event_no = 3;
	repeated float event_detail = 4;
  }
  message EventRecordReport {
	optional uint32 event_ver = 1;
	optional uint32 event_seq = 2;
	repeated EventRecordItem event_item = 3;
  }
  message EventInfoReportAck {
	optional uint32 result = 1;
	optional uint32 event_seq = 2;
	optional uint32 event_item_num = 3;
  }
  message ProductNameSet {
	optional string name = 1;
  }
  message ProductNameSetAck {
	optional uint32 result = 1;
  }
  message ProductNameGet {}
  message ProductNameGetAck {
	optional string name = 3;
  }
  message RTCTimeGet {}

  message RTCTimeGetAck {
	optional uint32 timestamp = 1;
	optional int32 timezone = 2;
  }
  message RTCTimeSet {
	optional uint32 timestamp = 1;
	optional int32 timezone = 2 [(nanopb).default = 0];
  }
  message RTCTimeSetAck {
	optional uint32 result = 1;
  }
  message country_town_message {
	optional uint32 country = 1;
	optional uint32 town = 2;
  }
  message time_task_config {
	optional uint32 task_index = 1;
	optional time_range_strategy time_range = 2;
	optional uint32 type = 3; // Task type: 1: prioritize power supply; 2: prioritize power storage
  }
  message time_task_delet {
	optional uint32 task_index = 1;
  }
  message time_task_config_post {
	optional time_task_config task1 = 1;
	optional time_task_config task2 = 2;
	optional time_task_config task3 = 3;
	optional time_task_config task4 = 4;
	optional time_task_config task5 = 5;
	optional time_task_config task6 = 6;
	optional time_task_config task7 = 7;
	optional time_task_config task8 = 8;
	optional time_task_config task9 = 9;
	optional time_task_config task10 = 10;
	optional time_task_config task11 = 11;
  }
  message time_task_config_ack {
	optional uint32 task_info = 1;
  }
  message rtc_data {
	optional int32 week = 1 [(nanopb).default = 0];
	optional int32 sec = 2 [(nanopb).default = 0];
	optional int32 min = 3 [(nanopb).default = 0];
	optional int32 hour = 4 [(nanopb).default = 0];
	optional int32 day = 5 [(nanopb).default = 0];
	optional int32 month = 6 [(nanopb).default = 0];
	optional int32 year = 7 [(nanopb).default = 0];
  }
  message time_range_strategy {
	optional bool is_config = 1; // Whether to enable: 0: no; 1: yes
	optional bool is_enable = 2; // Whether to configure: 0: no; 1: yes
	optional int32 time_mode = 3; // Scheduled mode: 0: daily; 1: weekly; 2: monthly; 3: do not repeat
	optional int32 time_data = 4; // mode == 1, bit0-bit6 represents Monday to Saturday respectively; mode == 2, bit0-bit30 represents the 1st to the 31st
	optional rtc_data start_time = 5;
	optional rtc_data stop_time = 6;
  }
  message plug_ack_message {
	optional uint32 ack = 1;
  }

message plug_heartbeat {
	optional uint32 err_code = 1;
	optional uint32 warn_code = 2;
	optional uint32 country = 3;
	optional uint32 town = 4;
	optional int32 max_cur = 5;
	optional int32 temp = 6;
	optional int32 freq = 7;
	optional int32 current = 8;
	optional int32 volt = 9;
	optional int32 watts = 10;
	optional bool switch = 11; //switchSta
	optional int32 brightness = 12;
	optional int32 max_watts = 13;
	optional int32 heartbeat_frequency = 14;
	optional int32 mesh_enable = 15;
	optional int32 unknown16 = 16;
	optional int32 unknown17 = 17;
	optional int32 unknown18 = 18;
	optional int32 uptime = 19;
	optional int32 unknown20 = 20;
	optional int32 unknown21 = 21;
	optional int32 unknown22 = 22;
	optional int32 unknown23 = 23;
	optional int32 unknown24 = 24;
	optional int32 unknown25 = 25;
	optional int32 unknown26 = 26;
	optional int32 unknown27 = 27;
	optional int32 unknown28 = 28;
	optional int32 unknown29 = 29;
	optional int32 unknown30 = 30;
	optional int32 streamConn_31 = 31;//stream connected
	optional int32 cntDevices = 32; //count of devices
	optional int32 streamOutputPower = 33; //total streamoutputpower
	optional int32 powerPlugs = 34; // power to plugs
	optional int32 unknown35 = 35;
	optional int32 unknown36 = 36;
	optional int32 unknown37 = 37;
	optional int32 unixtime_38 = 38; //unixtime, ggf. last connection, when connected to mqtt server
	optional int32 dynWattEnable = 39; //plug included for dynamic watts
	optional int32 wifiRssi = 40; //wifiRssi
  }
  message plug_switch_message {
	optional uint32 plug_switch = 1;
  }
  message brightness_pack {
	optional int32 brightness = 1 [(nanopb).default = 0];
  }
  message max_cur_pack {
	optional int32 max_cur = 1 [(nanopb).default = 0];
  }
  message max_watts_pack {
	optional int32 max_watts = 1 [(nanopb).default = 0];
  }
  message mesh_ctrl_pack {
	optional uint32 mesh_enable = 1 [(nanopb).default = 0];
  }
  message ret_pack {
	optional bool ret_sta = 1 [(nanopb).default = false];
  }

  message include_plug {
	optional bool include_plug = 1 [(nanopb).default = false];
  }

  message rated_power_pack {
	optional int32 rated_power = 1 [(nanopb).default = 0];
  }  

message Send_Header_Msg
{
    optional Header msg = 1;
}

message SendMsgHart
{
    optional int32 link_id = 1;
    optional int32 src = 2;
    optional int32 dest = 3;
    optional int32 d_src = 4; 
    optional int32 d_dest = 5;
    optional int32 enc_type = 6;
    optional int32 check_type = 7;
    optional int32 cmd_func = 8;
    optional int32 cmd_id = 9;
    optional int32 data_len = 10;
    optional int32 need_ack = 11;
    optional int32 is_ack = 12;
    optional int32 ack_type = 13;
    optional int32 seq = 14;
    optional int32 time_snap = 15;
    optional int32 is_rw_cmd = 16;
    optional int32 is_queue = 17;
    optional int32 product_id = 18;
    optional int32 version = 19;
}

message setMessage {
    setHeader header = 1;
 }
message setHeader {
    setValue pdata = 1 [proto3_optional = true];
    int32 src = 2 [proto3_optional = true];
    int32 dest = 3 [proto3_optional = true];
    int32 d_src = 4 [proto3_optional = true];
    int32 d_dest = 5 [proto3_optional = true];
    int32 enc_type = 6 [proto3_optional = true];
    int32 check_type = 7 [proto3_optional = true];
    int32 cmd_func = 8 [proto3_optional = true];
    int32 cmd_id = 9 [proto3_optional = true];
    int32 data_len = 10 [proto3_optional = true];
    int32 need_ack = 11 [proto3_optional = true];
    int32 is_ack = 12 [proto3_optional = true];
    int32 seq = 14 [proto3_optional = true];
    int32 product_id = 15 [proto3_optional = true];
    int32 version = 16 [proto3_optional = true];
    int32 payload_ver = 17 [proto3_optional = true];
    int32 time_snap = 18 [proto3_optional = true];
    int32 is_rw_cmd = 19 [proto3_optional = true];
    int32 is_queue = 20 [proto3_optional = true];
    int32 ack_type = 21 [proto3_optional = true];
    string code = 22 [proto3_optional = true];
    string from = 23 [proto3_optional = true];
    string module_sn = 24 [proto3_optional = true];
    string device_sn = 25 [proto3_optional = true];
}
message setValue {
    optional int32 value = 1;
	optional int32 value2 = 2;
}

//delta pro ultra
message dcoutput_pack {
	optional int32 dcoutput = 1;
}
message deviceTimeout_pack {
	optional int32 deviceTimeout = 1;
}
message lcdTimeout_pack {
	optional int32 lcdTimeout = 1;
}    
message dcTimeout_pack {
	optional int32 dcTimeout = 1;
} 
message acTimeout_pack {
	optional int32 acTimeout = 1;
} 
message chaLim_pack {
	optional int32 chaLim = 1;
}
message dischaLim_pack {
	optional int32 dischaLim = 1;
}
message acChargeSpeed_pack {
	optional int32 acChargeSpeedPower = 1;
	optional int32 acChargeSpeedAC = 2;
}
message backup_pack {
	optional int32 backupEnable = 1;
	optional int32 backupLim = 2;
}
message lte4g_pack {
	optional int32 lte4gEnable = 1;
}
message acalwaysOn_pack {
	optional int32 acAlwaysOnEnable = 1;
	optional int32 acAlwaysOnTime = 2;
}
message batPreCondOn_pack {
	optional int32 batPreCondOn = 1;
}
message areaTown_pack {
	optional string areaTown = 1;
}
message town_pack {
	optional sint32 town = 1;
	optional uint32 setAuto = 2;
}
message init_pack {
	optional uint32 unixtime = 1;
	optional sint32 town = 2;
}
message lab_pack {
	optional uint32 labVal = 1;
}
message rename_pack {
	optional string devName = 1;
}
message dpu_3 {
	optional uint32 bmsOnline1 = 1; // status or error?
	optional uint32 unknown2 = 2; // status or error?
	optional uint32 unknown3 = 3; // value
	optional uint32 bkpResEn = 4; // Backup reserve (0: Disabled, 1: Enabled)
	optional int32 bkpResLev = 5; // Backup reserve level [%]
	optional int32 unknown6 = 6; // enable; on/off
	optional int32 bkpResSolLev = 7; // Backup reserve solar charging level [%]
	optional int32 batPreCondEn = 8; // Battery Preconditioning (0: Disabled, 1: Enabled)
	optional int32 chaLim = 9; // Charge Limit [%]
	optional int32 dischaLim = 10; // Discharge Limit [%]
	optional int32 unknown11 = 11; // enable; on/off
	optional int32 unknown12 = 12; //limit?
	optional int32 acSpeed = 13; // AC Charging Speed [W]
	optional int32 power = 14; // Power In/Out [W]
	optional int32 devTimeout = 15; // Device Timeout [min] (0=Never)
	optional int32 lcdTimeout = 16; // LCD screen timeout [sec] (0=Never)
	optional int32 dc12vTimeout = 17; // 12V DC Timeout [min] (0=Never)
	optional int32 acTimeout = 18; // AC Timeout [min] (0=Never)
	optional int32 unknown19 = 19; // enable; on/off
	optional int32 unknown20 = 20; // enable; on/off
	optional int32 town = 21; //town
	optional string timezone = 22; //area/town
}
message AppParaHeartbeatReport
{
    optional uint32 sys_work_mode = 1;
    optional uint32 sys_backup_event = 2;
    optional uint32 sys_backup_soc = 3;
    optional uint32 energy_manage_enable = 4;
    optional uint32 backup_ratio = 5;
    optional uint32 ac_xboost = 6;
    optional uint32 ac_out_freq = 7;
    optional uint32 bms_mode_set = 8;
    optional uint32 chg_max_soc = 9;
    optional uint32 dsg_min_soc = 10;
    optional uint32 ac_often_open_flg = 11;
    optional uint32 ac_often_open_min_soc = 12;
    optional uint32 chg_5p8_set_watts = 13;
    optional uint32 chg_c20_set_watts = 14;
    optional uint32 power_standby_mins = 15;
    optional uint32 screen_standby_sec = 16;
    optional uint32 dc_standby_mins = 17;
    optional uint32 ac_standby_mins = 18;
    optional uint32 solar_only_flg = 19;
    optional uint32 timezone_settype = 20;
    optional sint32 sys_timezone = 21;
    optional string sys_timezone_id = 22;
}

message dpu_4 {
	optional uint32 unknown1 = 1; // status or error?
	optional uint32 soc3 = 3; // Soc
	optional float unknown4  = 4; // battery power
	optional float capacity5 = 5; // 
	optional int32 remainTime7 = 7; //  remain time
	optional int32 chaLim = 8; // Charge Limit [%]
	optional int32 dischaLim = 9; // Discharge Limit [%]
	optional int32 unknown11 = 11; // type
}
message BPInfo
{
    optional uint32 bp_no = 1;
    optional uint32 bp_chg_sta = 2;
    optional uint32 bp_soc = 3;
    optional float bp_pwr = 4;
    optional float bp_energy = 5; 
    optional uint32 heat_time = 6;
    optional uint32 remain_time = 7;
    optional uint32 bp_soc_max = 8;
    optional uint32 bp_soc_min = 9;
    optional uint32 bp_err_code = 10;
    optional int32 bp_temp = 11;
}

message BPInfoReport
{
    repeated BPInfo bp_info = 1;
}

message dpu_2 {
	optional uint32 unknown1 = 1; // status or error?
	optional uint32 unknown21 = 21; // status or error?
	optional uint32 unknown22 = 22; // status or error?
	optional uint32 watthBatt23 = 23; // Wh battery
	optional uint32 unknown24 = 24; // status or error?
	optional uint32 unknown25 = 25; // status or error?

	optional uint32 unknown41 = 41; // status 
	optional uint32 unknown42 = 42; // status 
	optional uint32 freq43 = 43; // frequency
	optional uint32 unknown44 = 44; // status 
	optional uint32 unknown45 = 45; // status 
	optional uint32 watthOut46 = 46; // Wh out
	optional uint32 watthIn47 = 47; // Wh in
	optional uint32 freq48 = 48; // frequency
	optional uint32 unknown49 = 49; // status 
	optional uint32 unknown50 = 50; // status 
	optional uint32 unknown51 = 51; // status 
	optional uint32 unknown52 = 52; // status 
	optional uint32 unknown53 = 53; // status 
	
	optional float volt61 = 61; // voltage
	optional float current62 = 62; // current

	optional float float63 = 63; // voltage
	optional float float64 = 64; // current

	optional float usbC1Volt65 = 65; // voltage
	optional float usbC1Current66 = 66; // current
	optional float usbC2Colt67 = 67; // voltage
	optional float usbC2Current68 = 68; // current

	optional float usbA1Volt69 = 69; // voltage
	optional float usbA1Current70 = 70; // current
	optional float usbA2Volt71 = 71; // voltage
	optional float usbA2Current72 = 72; // current

	optional float dcVolt73 = 73; // voltage
	optional float dcCurrent74 = 74; // current

	optional float ac1outBackupVolt75 = 75; // voltage
	optional float ac1outBackupCurrent76 = 76; // current
	optional float ac2outBackupvolt77 = 77; // voltage
	optional float ac2outBackupCurrent78 = 78; // current
	optional float ac1outOnlineVolt79 = 79; // voltage
	optional float ac1outOnlineCurrent80 = 80; // current
	optional float ac2outOnlineVolt81 = 81; // voltage
	optional float ac2outOnlineCurrent82 = 82; // current

	optional float ac30AVolt83 = 83; // voltage
	optional float ac30ACurrent84 = 84; // current
	optional float acL14Volt85 = 85; // voltage
	optional float acL14Current86 = 86; // current

	optional float solarLowVolt87 = 87; // voltage
	optional float solarLowcurrent88 = 88; // current

	optional float solarHighVolt89 = 89; // voltage
	optional float solarHighCurrent90 = 90; // current

	optional float acInVolt91 = 91; // voltage
	optional float acInCurrent92 = 92; // current

	optional float powerIOInVolt93 = 93; // voltage
	optional float powerIOInCurrent94 = 94; // current

	optional float powerIOOutVolt95 = 95; // voltage
	optional float powerIOOutCurrent96 = 96; // current

	optional float temp97 = 97; //temp in degC?
	optional float temp98 = 98; //temp in degC?
	optional float temp99 = 99; //temp in degC?
	optional float temp100 = 100; //temp in degC?

	optional uint32 unknown101 = 101; //
	optional float unknown102 = 102; // value 
}
message BackendRecordHeartbeatReport
{
    optional uint32 record_flag = 1;
    optional uint32 sys_work_sta = 21;
    optional uint32 chg_reign_sta = 22;
    optional uint32 pcs_work_sta = 23;
    optional uint32 fan_state = 24;
    optional uint32 ems_work_sta = 25;
    optional uint32 c20_in_type = 41;
    optional uint32 work_5p8_mode = 42;
    optional uint32 ac_in_freq = 43;
    optional uint32 ems_max_avail_num = 44;
    optional uint32 ems_open_bms_idx = 45;
    optional uint32 ems_para_vol_min = 46;
    optional uint32 ems_para_vol_max = 47;
    optional uint32 ac_out_freq = 48;
    optional uint32 pcs_dc_err_code = 49;
    optional uint32 pcs_ac_err_code = 50;
    optional uint32 lv_pv_err_code = 51;
    optional uint32 hv_pv_err_code = 52;
    optional uint32 ads_err_code = 53;
    optional float bat_vol = 61;
    optional float bat_amp = 62;
    optional float bms_input_watts = 63;
    optional float bms_output_watts = 64;
    optional float out_usb1_vol = 65;
    optional float out_usb1_amp = 66;
    optional float out_usb2_vol = 67;
    optional float out_usb2_amp = 68;
    optional float out_typec1_vol = 69;
    optional float out_typec1_amp = 70;
    optional float out_typec2_vol = 71;
    optional float out_typec2_amp = 72;
    optional float out_ads_vol = 73;
    optional float out_ads_amp = 74;
    optional float out_ac_l1_1_vol = 75;
    optional float out_ac_l1_1_amp = 76;
    optional float out_ac_l1_2_vol = 77;
    optional float out_ac_l1_2_amp = 78;
    optional float out_ac_l2_1_vol = 79;
    optional float out_ac_l2_1_amp = 80;
    optional float out_ac_l2_2_vol = 81;
    optional float out_ac_l2_2_amp = 82;
    optional float out_ac_tt_vol = 83;
    optional float out_ac_tt_amp = 84;
    optional float out_ac_l14_vol = 85;
    optional float out_ac_l14_amp = 86;
    optional float out_ac_5p8_vol = 87;
    optional float out_ac_5p8_amp = 88;
    optional float in_ac_5p8_vol = 89;
    optional float in_ac_5p8_amp = 90;
    optional float in_ac_c20_vol = 91;
    optional float in_ac_c20_amp = 92;
    optional float in_lv_mppt_vol = 93;
    optional float in_lv_mppt_amp = 94;
    optional float in_hv_mppt_vol = 95;
    optional float in_hv_mppt_amp = 96;
    optional float pcs_dc_temp = 97;
    optional float pcs_ac_temp = 98;
    optional float mppt_lv_temp = 99;
    optional float mppt_hv_temp = 100;
    optional int32 pd_temp = 101;
    optional float ev_max_charger_cur = 102;
}

//pd?
message dpu_1 {
	optional uint32 sysVer1 = 1; // 
	optional int32 unknown2 = 2; // status or error?
	optional int32 unknown3 = 3; // status or error?

	optional int32 unknown10 = 10; // status
	optional int32 unknown11 = 11; // status
	optional int32 unknown12 = 12; // status
	optional int32 unknown13 = 13; // status
	optional int32 unknown14 = 14; // status

	optional int32 lim15 = 15; // limit discharge

	optional string unknown16 = 16; // array?
	
	optional int32 soc21 = 21; // soc same as dpu_4 item3
	optional int32 unknown22 = 22; // status
	optional int32 unknown23 = 23; // status
	optional int32 maxAcPower24 = 24; // 
	optional int32 maxPowerPowerPort25 = 25; // 

	optional int32 remainTime26 = 26; // same as dpu_4 item7
	optional int32 unknown27 = 27; // status

	optional int32 limit28 = 28; // 
	optional int32 limit29 = 29; // 

	optional float totalInputPower41 = 41; // total input power [W]
	optional float totalOutputPower42 = 42; // total output power [W]
	optional float usbC1power43 = 43; // USB C
	optional float usbC2power44 = 44; // USB C
	optional float usbA1power45 = 45; // USBA
 	optional float usbA2power46 = 46; // USB A
	optional float dcPower47 = 47; // DC Anderson
	optional float ac1outBackupPower48 = 48; // backup UPS left AC 20A output power [W]
	optional float ac2outBackupPower49 = 49; //  backup UPS right AC 20A output power [W]
	optional float ac1outOnlinePower50 = 50; // online UPS left AC 20A output power [W]
	optional float ac2outOnlinePower51 = 51; // online UPS right AC 20A output power [W]
	optional float acout30APower52 = 52; // 200V AC 20A output power [W]
	optional float acoutL14Power53 = 53; // 100/200V AC 30A output power [W]
	optional float ioPower54 = 54; // POWER IO output power [W]
	optional float totalInputPower56 = 56; // total input power [W], float 
	optional float solarLowInputPower57 = 57; // solar low
	optional float solarHighInputPower58 = 58; // solar high
	optional float float59 = 59; // ac in


	optional int32 unknown100 = 100; // status 
	optional int32 unknown101 = 101; // status 

	//102-109 repeated as 121-128
	optional int32 unknown102 = 102; // status 
	optional int32 unknown103 = 103; //
	optional int32 unknown104 = 104; //
	optional int32 unknown105 = 105; //
	optional int32 unknown106 = 106; // status 
	optional int32 unknown107 = 107; // status 
	optional int32 unknown108 = 108; // status 
	optional int32 unknown109 = 109; // status 

	optional int32 unknown121 = 121; // status
	optional int32 unknown122 = 122; //
	optional int32 unknown123 = 123; //
	optional int32 unknown124 = 124; //
	optional int32 unknown125 = 125; // status 
	optional int32 unknown126 = 126; // status 
	optional int32 unknown127 = 127; // status 
	optional int32 unknown128 = 128; // status 

}

message AppShowHeartbeatReport
{
    optional uint32 proto_ver = 1;
    optional uint32 show_flag = 2;
    optional uint32 access_type = 3;
    optional sint32 wireless_4g_on = 10;
    optional sint32 wireless_4g_sta = 11;
    optional uint32 access_5p8_in_type = 12;
    optional uint32 access_5p8_out_type = 13;
    optional sint32 wireless_4g_con = 14;
    optional sint32 wirlesss_4g_err_code = 15;
    optional string sim_iccid = 16;
    optional uint32 soc = 21;
    optional uint32 bp_num = 22;
    optional uint32 pcs_type = 23;
    optional uint32 c20_chg_max_watts = 24;
    optional uint32 para_chg_max_watts = 25;
    optional uint32 remain_time = 26;
    optional uint32 sys_err_code = 27;
    optional uint32 full_combo = 28;
    optional uint32 remain_combo = 29;
    optional float watts_in_sum = 41;
    optional float watts_out_sum = 42;
    optional float out_usb1_pwr = 43;
    optional float out_usb2_pwr = 44;
    optional float out_typec1_pwr = 45;
    optional float out_typec2_pwr = 46;
    optional float out_ads_pwr = 47;
    optional float out_ac_l1_1_pwr = 48;
    optional float out_ac_l1_2_pwr = 49;
    optional float out_ac_l2_1_pwr = 50;
    optional float out_ac_l2_2_pwr = 51;
    optional float out_ac_tt_pwr = 52;
    optional float out_ac_l14_pwr = 53;
    optional float out_ac_5p8_pwr = 54;
    optional float in_ac_5p8_pwr = 55;
    optional float in_ac_c20_pwr = 56;
    optional float in_lv_mppt_pwr = 57;
    optional float in_hv_mppt_pwr = 58;
    optional float out_pr_pwr = 59;
    optional uint32 time_task_change_cnt = 100;
    optional uint32 time_task_conflict_flag = 101;
    optional uint32 chg_time_task_notice = 102;
    optional  int32 chg_time_task_type = 103;
    optional  int32 chg_time_task_index = 104;
    optional  int32 chg_time_task_mode = 105;
    optional uint32 chg_time_task_param = 106;
    optional uint32 chg_time_task_table_0 = 107;
    optional uint32 chg_time_task_table_1 = 108;
    optional uint32 chg_time_task_table_2 = 109;
    optional uint32 dsg_time_task_notice = 121;
    optional  int32 dsg_time_task_type = 122;
    optional  int32 dsg_time_task_index = 123;
    optional  int32 dsg_time_task_mode = 124;
    optional uint32 dsg_time_task_param = 125;
    optional uint32 dsg_time_task_table_0 = 126;
    optional uint32 dsg_time_task_table_1 = 127;
    optional uint32 dsg_time_task_table_2 = 128;
}

//SHP2

message shp2time
{
    optional int32 unixtime = 1;
}

message shp2cmd
{
    optional int32 max_current_amp = 10;
	optional int32 unknown_22 = 22;
	optional int32 unknown_23 = 23;
}

message shp2getreply
{
    optional uint64 percent = 10;
}

message RtcHalData {
    required int32 week = 1;
    required int32 sec = 2;
    required int32 min = 3;
    required int32 hour = 4;
    required int32 day = 5;
    required int32 month = 6;
    required int32 year = 7;
}

message ModelInfo {
    optional string sn = 1;
}

message ErrCode {
    repeated int32 err_code = 1;
}

message BackupEnergyTimeInfo 
{
    optional int32 charge_time = 1;
    optional int32 discharge_time = 2;
}

message MasterTimeInfo 
{
    optional float grid_watt = 1;
    optional int32 sys_timezone = 2;
    optional int32 time_type = 3;
    optional string timezone_id = 4;
}

message LoadTimeInfo 
{
    repeated float hall1_watt = 1;
    repeated float hall1_curr = 2;
}

message BackupTimeInfo 
{
    optional int32 ch_watt = 1;
    optional int32 backup_discharge_time = 2;
    optional BackupEnergyTimeInfo energy_1 = 20;
    optional BackupEnergyTimeInfo energy_2 = 21;
    optional BackupEnergyTimeInfo energy_3 = 22;
}

message WattTimeInfo 
{
    optional float grid_watt = 1;
    optional float ch_watt = 11;
    optional float all_hall_watt = 21;
}

message MasterVerTimeInfo 
{
    optional int32 app_main_ver = 1;
    optional int32 app_sub_ver = 2;
    optional int32 app_dbg_ver = 3;
    optional int32 app_test_ver = 4;
}

message MasterIncreInfo {
    optional ErrCode errCode = 1;
    optional int32 grid_sta = 2;
    optional int32 grid_vol = 3;
    optional int32 master_rly1_cnt = 4; 
	optional int32 master_rly2_cnt = 5; 
	optional int32 master_rly3_cnt = 6; 
	optional int32 master_rly4_cnt = 7;
	optional int32 master_rly_err_flg = 16;
	optional float backup_vol_L1_safe_data = 30;
	optional float backup_vol_L2_safe_data = 31;
	optional int32 backup_phase_diff_safe_data = 32;
	optional float load_vol_L1_safe_data = 33;
	optional float load_vol_L2_safe_data = 34;
	optional int32 load_phase_diff_safe_data = 35;
	optional float master_vol_L1_safe_data = 36;
	optional float master_vol_L2_safe_data = 37;
	optional int32 master_phase_diff_safe_data = 38;
}

message LoadSplitPhaseCfg
{
	optional int32 link_mark = 1;
	optional int32 link_ch = 2;
}

message LoadChInfo 
{
	optional LoadSplitPhaseCfg splitphase = 1;
	optional int32 set_amp = 2;
	optional int32 icon_num = 3;
	optional string ch_name = 4;
	optional int32 load_rly_cnt = 5;
    optional int32 history_ch_watt_max = 6;
    optional int32 load_sta = 7;
    optional int32 ctrl_mode = 8;
}

message LoadChaSta
{
	optional int32 load_sta = 1;
	optional int32 ctrl_mode = 2;
	optional int32 notice_set_time = 3;
	optional int32 notice_enable = 4;
	optional int32 notice_action = 5;
	optional int32 load_rly_cnt = 6;
	optional int32 history_ch_watt_max = 7;
	optional int32 load_ch_switch_cause = 8;
}

message HallIncreInfo
{
	optional ErrCode err_code= 1;
	optional ModelInfo model_info = 2;
	optional int32 mid_priority_discharge_time = 3;
	optional int32 high_priority_discharge_time = 4; 
	optional LoadChInfo ch1_info = 30;
	optional LoadChInfo ch2_info = 31;
	optional LoadChInfo ch3_info = 32;
	optional LoadChInfo ch4_info = 33;
	optional LoadChInfo ch5_info = 34;
	optional LoadChInfo ch6_info = 35;
	optional LoadChInfo ch7_info = 36;
	optional LoadChInfo ch8_info = 37;
	optional LoadChInfo ch9_info = 38;
	optional LoadChInfo ch10_info = 39;
	optional LoadChInfo ch11_info = 40;
	optional LoadChInfo ch12_info = 41;

	optional LoadChaSta ch1_sta = 90;
	optional LoadChaSta ch2_sta = 91;
	optional LoadChaSta ch3_sta = 92;
	optional LoadChaSta ch4_sta = 93;
	optional LoadChaSta ch5_sta = 94;
	optional LoadChaSta ch6_sta = 95;
	optional LoadChaSta ch7_sta = 96;
	optional LoadChaSta ch8_sta = 97;
	optional LoadChaSta ch9_sta = 98;
	optional LoadChaSta ch10_sta = 99;
	optional LoadChaSta ch11_sta = 100;
	optional LoadChaSta ch12_sta = 101;
}

message LoadIncreInfo
{
	optional HallIncreInfo hall1_incre_info = 1;
}

message BackupEnergyIncreDevInfo
{
	optional ModelInfo model_info = 1;
	optional int32 type = 2;
	optional int32 full_cap = 3;
	optional float rate_power = 4;
}

message BackupEnergyIncreInfo
{
	optional BackupEnergyIncreDevInfo dev_info = 1;
	optional int32 is_enable = 2;
	optional int32 is_connect = 3;
	optional int32 is_ac_open= 4;
	optional int32 is_power_output = 5;
	optional int32 is_grid_charge = 6; 
	optional int32 is_mppt_charge = 7; 
	optional int32 battery_percentage = 8;
	optional float output_power = 9; 
	optional int32 oil_pack_num = 10;
	optional int32 mult_pack_num = 11;
	optional int32 ems_chg_flag = 12;
	optional int32 hw_connect = 13; 
	optional int32 ems_bat_temp = 14;
	optional int32 lcd_input_watts = 15;
	optional int32 pv_charge_watts = 16;
	optional int32 pv_low_charge_watts = 17;
	optional int32 pv_height_charge_watts = 18;
	optional int32 error_code_num = 19; 
}

message BackupChannelInfo
{
	optional int32 backup_is_ready = 1;
	optional int32 ctrl_sta = 2;
	optional int32 force_charge_sta = 3;
	optional int32 backup_rly1_cnt = 4;
	optional int32 backup_rly2_cnt = 5;
	optional int32 wake_up_charge_sta = 6;
	optional int32 energy_5p8_type = 7;
}

message ProBackupEnergyIncreInfo
{
	optional ModelInfo model_info = 1;
	optional int32 is_connect = 2;
	optional int32 battery_soc = 3;
	optional int32 full_cap = 4;
	optional float rate_power = 5;
	optional int32 is_ac_open = 6;
	optional float output_power = 7;
	optional int32 ems_bat_temp = 8;
	optional int32 lcd_input_watts = 9;
	optional int32 pv_insert_state = 10;
	optional int32 pv_low_charge_watts = 11;
	optional int32 charge_time = 12;
	optional int32 discharge_time = 13;
	optional int32 error_code_num = 14;
}

message BackupIncreInfo
{
	optional ErrCode errcode= 1;
	optional int32 backup_full_cap = 2;
	optional int32 backup_bat_per = 3;
	optional int32 backup_discharge_rmain_bat_cap = 4;
	optional int32 cur_discharge_soc = 5;
	optional BackupChannelInfo backup_ch1_info = 60;
	optional BackupChannelInfo backup_ch2_info = 61;
	optional BackupChannelInfo backup_ch3_info = 62;
	optional BackupEnergyIncreInfo Energy1_info = 80;
	optional BackupEnergyIncreInfo Energy2_info = 81;
	optional BackupEnergyIncreInfo Energy3_info = 82;
	optional ProBackupEnergyIncreInfo Delta_pro1_info = 90; 
	optional ProBackupEnergyIncreInfo Delta_pro2_info= 91; 
}

message StrategyChInfo
{
	optional int32 load_is_enable = 1;
	optional int32 load_priority = 2;
	optional int32 load_priority_type = 3;
}

message EmergencyStrategy
{
	optional int32 is_cfg = 1;
    optional int32 backup_mode = 2;
    optional int32 overload_mode = 3;
	optional int32 mid_priority_ch_discharge_low = 4;
	repeated StrategyChInfo hall1_ch_info = 5;
    optional int32 is_enable = 7;
}

message TimeRangeStrategy
{
	optional int32 is_cfg = 1;
	optional int32 is_enable = 2;
	optional int32 time_mode = 3;
	optional int32 time_data = 4;
	optional RtcHalData start_time = 5;
	optional RtcHalData stop_time = 6;
}

message TimeScaleSta
{
	optional int32 sta = 1;
}

message TimeTaskComCfg
{
   optional int32 is_cfg = 1;
   optional int32 is_enable = 2;
   optional int32 type = 3;
   optional RtcHalData set_time = 4;
   optional TimeRangeStrategy time_range = 5;
   optional TimeScaleSta time_scale = 6;
}

message BackupChargeCfg
{
	optional int32 is_allow = 1;
	optional int32 charge_watt = 2;
	optional int32 low_soc = 3;
	optional int32 high_soc = 4;
	optional int32 backup_reserve_enable = 5;
	optional int32 backup_reserve_soc = 6;
}

message BackupDischargeCfg
{
	optional int32 is_allow = 1;
	optional int32 discharge_watt = 2;
	optional int32 low_soc = 3;
	optional int32 backup_soc = 4;
}

message ChargeTimeCfg
{
   optional int32 ch_charge_watt = 1;
   optional int32 low_battery = 2;
   optional int32 hight_battery = 3;
   optional StrategyChInfo backup_ch_info = 4;
}

message DischargeTimeCfg
{
   optional int32 mid_priority_ch_discharge_low = 1;
   optional StrategyChInfo hall1_ch_info = 2;
}

message TimeTaskCfg
{
   optional TimeTaskComCfg  com_cfg = 1;
   optional ChargeTimeCfg  charge_cfg = 2;
   optional DischargeTimeCfg  discharge_cfg = 3;
}

// 1, 12
message ProtoTime
{
	optional MasterTimeInfo  master_info = 1;
	optional LoadTimeInfo  load_info = 2;
	optional BackupTimeInfo  backup_info = 3;
	optional WattTimeInfo  watt_info = 4;
	optional MasterVerTimeInfo  master_ver_info = 5;
}

message SysEventRecordItem
{
	optional int32 sys_ms = 1;
	optional int32 timestamp = 2;
	optional int32 event_no= 3;
	optional int32 dur_time = 4;
}

message SysEventRecordReport
{
	optional int32 event_seq = 1;
	optional SysEventRecordItem event_report = 2;
}

message SysEventInfoReportAck
{
	optional int32 event_seq = 1;
	optional int32 event_item_num =2;
}

message TouData
{
	optional float tou_char_dischar_data = 1;
}

// 32, 12
message ProtoPushAndSet
{
	optional int32 grid_vol = 1;
	optional int32 grid_freq= 2;
	optional int32 product_type = 3;
	optional int32 eps_mode_info = 5; 
	optional int32 foce_charge_hight = 6;
	optional int32 charge_watt_power = 7;
	optional int32 disc_lower= 8;
	optional int32 power_sta= 9;
	optional int32 master_cur = 10;
	optional int32 is_set_oil_engine = 11;
	optional int32 oil_engine_watt = 12;
	optional int32 is_get_cfg_flag  = 14;
	optional int32 has_config_done= 15;
	optional int32 is_area_err = 16;
	optional string area = 17;
	optional int32 ch1_force_charge = 18;
	optional int32 ch2_force_charge = 19;
	optional int32 ch3_force_charge = 20;
	optional int32 storm_is_enable = 21;
	optional int32 storm_end_timestamp = 22;
	optional int32 in_storm_mode = 23;
	optional int32 ch1_enable_set = 24;
	optional int32 ch2_enable_set = 25;
	optional int32 ch3_enable_set = 26;
	optional int32 oil_engine_to_back_charge_persent = 27;
	optional int32 clear_ntc_over_temp_err = 28; 
	optional EmergencyStrategy LoadStrategyCfg = 30;
	optional TimeTaskCfg TimeTaskCfg_1 = 31; 
	optional TimeTaskCfg TimeTaskCfg_2 = 32;
	optional TimeTaskCfg TimeTaskCfg_3 = 33;
	optional TimeTaskCfg TimeTaskCfg_4 = 34;
	optional TimeTaskCfg TimeTaskCfg_5 = 35;
	optional TimeTaskCfg TimeTaskCfg_6 = 36;
	optional TimeTaskCfg TimeTaskCfg_7 = 37;
	optional TimeTaskCfg TimeTaskCfg_8 = 38;
	optional TimeTaskCfg TimeTaskCfg_9 = 39;
	optional TimeTaskCfg TimeTaskCfg_10 = 40;
	optional int32 ntc_over_temp_err = 41;
	optional int32 unknown42 = 42;
	optional int32 smart_backup_mode = 61;
	optional int32 backup_reserve_enable = 62;
	optional int32 backup_reserve_soc = 63;
	optional int32 localTime = 64;
	optional TouData toudata = 65;
	optional float time_zone = 66;
	optional int32 solar_backup_reserve_soc = 67;
	optional int32 oil_type = 70;
	optional int32 oil_max_output_watt = 71;
	optional BackupIncreInfo backup_incre_info = 80;
	optional LoadIncreInfo load_incre_info  = 81;
	optional MasterIncreInfo master_incre_info = 82;
	optional int32 storm_request_flag = 90;
	optional int32 storm_cur_time_stop_flag = 91;
	optional int32 sys_cur_running_state = 92;
	optional int32 rly1_real_sta = 93;
	optional int32 rly2_real_sta = 94;
	optional int32 rly3_real_sta = 95;
	optional int32 rly4_real_sta = 96;
	optional int32 cur_running_strategy = 97;
	optional int32 reason_of_stop_dischar = 98;
	optional int32 reason_os_stop_charge = 99;
	optional int32 inlet_box_current = 100;
	optional int32 reason_of_stop_dischar_ack = 101;
	optional int32 reason_os_stop_charge_ack = 102;
	optional int32 reconfig_flag = 103;
	optional int32 phase_sub_value = 104;  
	optional int32 req_clear_data = 110; 
	optional int32 ack_clear_data = 111; 
	optional int32 clear_data_fail_sta = 112; 
}

message BackupProtoTime
{
	optional BackupTimeInfo backup_info = 1; 
}

message LoadSafeDataTime
{
	optional float load_vol_L1_time = 1;
	optional float load_vol_L2_time = 2;
	optional int32 load_phase_diff_time = 3; 
}

message LoadProtoTime
{
	optional LoadTimeInfo load_info = 1;
	optional LoadSafeDataTime load_safe_info = 2; 
}

message LoadHeartBeatTime
{
	optional int32 time_stamp = 1; 
}

message BackHeartTime
{
	optional int32 time_stamp = 1;
}

message MasterToBackHeartBeatTime
{
	optional int32 time_stamp = 1;
	optional int32 grid_status = 2;
	optional int32 error_state = 3;
	optional int32 phase_sub_value = 4;
}

message MasterToLoadHeartTime
{
	optional int32 time_stamp = 1;
}

message MasterToBackProtoPushAndSet
{
	optional int32 grid_vol = 1;
	optional int32 grid_freq = 2;
	optional int32 stop_key_status = 3;
	optional int32 grid_status = 4;
	optional int32 is_area_err = 5;
	optional int32 master_to_back_time_stamp = 6;
	optional int32 is_get_backup_info = 7;
	optional int32 open_door_flag = 8;
	optional int32 overall_err_sta = 9;
	optional BackupChargeCfg ch1_charge_cfg = 10;
	optional BackupChargeCfg ch2_charge_cfg = 11;
	optional BackupChargeCfg ch3_charge_cfg = 12;
	optional int32 ch1_enable_set = 13;
	optional int32 ch2_enable_set = 14;
	optional int32 ch3_enable_set = 15;
	optional BackupDischargeCfg ch1_discharge_cfg = 30;
	optional BackupDischargeCfg ch2_discharge_cfg = 31;
	optional BackupDischargeCfg ch3_discharge_cfg = 32;
	optional float overall_load_pwr = 33;
	optional float overall_load_pwr_L2 = 34;
	optional int32 ch1_force_charge = 50;
	optional int32 ch2_force_charge = 51;
	optional int32 ch3_force_charge = 52;
	optional ModelInfo mc_model_info = 70;
}

message BackToMasterProtoPush
{
	optional int32 max_power = 1;
	optional int32 output_power = 2;
	optional BackupIncreInfo backup_incre_info = 3;
	optional int32 backup_sys_sta = 4;
	optional int32 back_to_master_time_stamp = 5;
	optional int32 get_master_init_sta = 6;
	optional float backup_vol_L1 = 7;
	optional float backup_vol_L2 = 8;
	optional float backup_watt_L1 = 9;
	optional float backup_watt_L2 = 10;
	optional int32 backup_phase_diff = 11;
	optional float ch1_vol_L1 = 12;
	optional float ch1_vol_L2 = 13;
	optional float ch2_vol_L1 = 14;
	optional float ch2_vol_L2 = 15;		
	optional float ch3_vol_L1 = 16;
	optional float ch3_vol_L2 = 17;
	optional int32 discharge_AC_out_sta = 20;
	optional int32 rly_s3_sta = 21;
	optional int32 dev_charge_err_sta = 22;
}

// ocean

message ocean_113_msg {
	optional ocean_113_1_msg msg_1 = 1;
}

message ocean_113_1_msg {
	repeated bpSta_msg bpSta = 1;
}

message bpSta_msg {
	optional int32 soc1 = 1;
	optional int32 status2 = 2;
	optional string name3 = 3;
	optional int32 unknown5 = 5;
	optional int32 unknown6 = 6;
	optional int32 unknown7 = 7;
	optional int32 moduleAplSwVer8 = 8;
	optional int32 moduleLoaderSwVer9 = 9;
}

message oceanConfig {
	optional string emsSerial = 1;
	optional string pcsSerial = 2;
	repeated string bpSerial = 3;
}

message mpptPv {
	optional float vol = 1;
	optional float amp = 2;
	optional float pwr = 3;
	optional int32 lightSta = 4;
}

message mpptHeartBeat {
	repeated mpptPv mpptPv = 1;
	optional float mpptInsResist = 2;
	repeated float mpptTempVal = 3;
}

message meterHeartBeat {
	optional int32 meterType = 1;
	optional int32 meterAddr = 2;
	repeated float meterData = 3;
}

message pcsPhase {
	optional float volt = 1;
	optional float amp = 2;
	optional float actPwr = 3;
	optional float reactPwr = 4;
	optional float apparentPwr = 5;
}

message JTS1_EMS_HEARTBEAT {
	optional float bpRemainWatth = 1;

	optional float pcsAcFreq = 11;
	optional pcsPhase pcsAPhase = 12;
	optional pcsPhase pcsBPhase = 13;
	optional pcsPhase pcsCPhase = 14;
	optional float pcsBusVolt = 16;
	optional float pcsLeakAmp = 17;
	optional float pcsDci = 18;
	optional meterHeartBeat meterHeartBeat = 30;
	optional mpptHeartBeat mpptHeartBeat = 31;
	optional float pcsVbusRef = 32;
	optional float pcsActivePowerRef = 33;
	optional float pcsActivePowerLimitUp = 34; //evtl 33vs34 getauscht
	optional float pcsActivePowerLimitDn =35;

	optional int32 pcsRelayStateShow = 38;
	optional int32 pcsGridSafetyFuncRecord = 39;
	optional int32 pcsGridSafetyStateRecord = 40;
	optional float pcsGridInvErrorRms = 41;

	optional float pcsReactivePowerRef = 44;

	optional float pcsVgridThd = 48;
	optional float pcsInterruptOccupancyRate = 49;

	optional float emsBusVolt = 56;

	optional int32 emsBpAliveNum = 58;
	optional float emsBpPower = 59;
	optional float emsBpChg = 60;
	optional float emsBpDsg = 61;

	optional int32 emsSelfUsedCnt = 63;
	optional int32 emsAcMakeupTriggleSoc = 64;
	optional int32 emsAcMakeupExitSoc = 65;

    optional int32 emsStartFsmState = 68;

	optional int32 emsStopCmd = 71;
	optional int32 iot4gErr = 72;

	optional int32 emsMpptHbState = 80;
	optional float emsNtcTempMax = 81;
	optional float emsBusVoltErrSlidFilter = 82;
	optional float emsBusVoltRipple = 83;
}

message JTS1_ENERGY_STREAM_REPORT {
	optional float sysLoadPwr  = 1;
	optional float sysGridPwr = 2;
	optional float mpptPwr = 3;
	optional float bpPwr = 4;
	optional int32 bpSoc = 5;
}

message JTS1_EMS_PARAM_CHANGE_REPORT {
	/*
	"smartCtrl": "False",
	"energyEfficientEnable": "False",
	"bpBurst": "False",
	"lowerPowerStat": "False",
	"sysZone": 0,
	"sysTimeTab": 0
	*/

	optional int32 breakerCapacityMax = 7;
	optional int32 breakerEnableState = 8;
}

message JTS1_LOGY_DEV_REPORT {
	optional string devSn = 1;
	optional int32 online =2;
	repeated int32 errorCode = 7;
}

message JTS1_EMS_CHANGE_REPORT {
	optional int32 bpSoc = 7;
	optional int32 emsSysSelfCheckStat = 8;
	optional int32 bpTotalChgEnergy = 13;
	optional int32 bpTotalDsgEnergy = 14;
	optional int32 emsFeedMode = 16;
	optional int32 emsFeedRatio = 17;
	optional int32 emsFeedPwr = 18;
	optional float pcsOverVol1 = 31;
	optional float pcsOverVol2 = 32;
	optional float pcsLowVol1 = 37;
	optional float pcsLowVol2 = 38;
	optional float pcsLowVol3 = 39;
	optional int32 pcsLowVolTime1 = 40;
	optional int32 pcsLowVolTime2 = 41;
	optional int32 pcsLowVolTime3 = 42;
	optional float pcsOverFreq1 = 48;
	optional float pcsOverFreq2 = 49;
	optional float pcsLowFreq1 = 52;
	optional float pcsLowFreq2 = 53;
	optional float pcsOverFreqRecover = 56;
	optional float pcsOverVolRideThroughStart1 = 60;
	optional float pcsOverVolRideThroughStart2 = 61;
	optional int32 pcsOverVolRideThroughProtectTime1 = 62;
	optional int32 pcsOverVolRideThroughProtectTime2 = 63;
	optional float pcsLowVolRideThroughStart1 = 64;
	optional float pcsLowVolRideThroughStart2 = 65;
	optional float pcsLowVolRideThroughStart3 = 66;
	optional int32 pcsLowVolRideThroughProtectTime1 = 67;
	optional int32 pcsLowVolRideThroughProtectTime2 = 68;
	optional int32 pcsLowVolRideThroughProtectTime3 = 69;
	optional float pcsActivePowerGradient = 75;
	optional int32 pcsActivePowerSoftstartTime = 77;
	optional float pcsOverFreqDeratingPowerBased = 79;
	optional float pcsOverFreqDeratingStart = 80;
	optional float pcsOverFreqDeratingEnd = 81;
	optional float pcsOverFreqDeratingSlope = 82;
	optional float pcsOverFreqDeratingRecoverSlope = 83;
	optional float pcsUnderFreqIncrementStart = 87;
	optional float pcsUnderFreqIncrementEnd = 88;
	optional float pcsUnderFreqIncrementSlope = 89;
	optional float pcsUnderFreqIncrementRecoverSlope = 90;
	optional float pcsOverVolRecover = 94;
	optional float pcsOverVolDeratingEnd = 95;
	optional float pcsReactPwrCompensation = 100;
	optional float pcsQuV1 = 103;
	optional float pcsQuV2 = 104;
	optional float pcsQuV3 = 105;
	optional float pcsQuV4 = 106;
	optional float pcsQuQ1 = 107;
	optional float pcsQuQ2 = 108;
	optional float pcsQuQ3 = 109;
	optional float pcsQuQ4 = 110;
	optional float pcsQuTimeConst = 111;
	optional float pcsCospP1 = 112;
	optional float pcsCospP2 = 113;
	optional float pcsCospP3 = 114;
	optional float pcsCospPf1 = 115;
	optional float pcsCospPf2 = 116;
	optional float pcsCospPf3 = 117;
	optional int32 pcsOnGridWaitTime = 120;
	optional float pcsHighFreqOnGrid = 123;
	optional int32 pcsFaultRecoverOnGridWaitTime = 125;
	optional float pcsFaultRecoverHighFreqOnGrid = 128;
	optional float pcsFaultRecoverLowFreqOnGrid = 129;
	optional int32 pcsPowerDeratingFlag = 130;
	optional int32 pcsPowerDeratingSet = 131;
	optional int32 sysMulPeakTime = 181;
	optional int32 pcsRunFsmState = 193;
	optional int32 pcsRelayStateShow = 204;
}

message bpStaReport {
	optional float bpPwr =1;
	optional int32 bpSoc =2;
	optional int32 bpSoh =3;
	repeated float bpTemp = 5 [packed=true];
	optional int32 bpMaxCellVol = 6;
	optional int32 bpMinCellVol = 7;
	optional int32 bpRunSta = 8;  //1=RUNSTA_RUN
	optional float bpVol = 9;
	optional float bpAmp = 10;
	optional float bpBusVol =11;
	optional int32 bpErrCode =13;
	repeated float bpCellVol = 14 [packed=true];
	optional int32 bpDsrc =15;
	optional string bpSn = 16;
	optional int32 bpCycles = 17;
	optional int32 bpBalanceState = 18;
	optional float bpHvMosTemp = 19;
	optional float bpLvMosTemp = 20;
	optional float bpPtcTemp= 21;
	optional float bpHtsTemp = 22;
	optional float bpBusNegTemp = 23;
	optional float bpBusPosTemp = 24;
	optional float bpEnvTemp = 25; 
	optional int32 bpAccuChgCap = 26;
	optional int32 bpAccuDsgCap = 27;
	optional int32 bpDesignCap = 28;
	optional int32 bpFullCap = 29;
	optional float bpMaxCellTemp = 30;
	optional float bpMinCellTemp = 31;
	optional float bpMaxMosTemp = 32;
	optional float bpMinMosTemp = 33;
	optional int32 bpBmsFault = 34;
	optional int32 bpEcloundSoc = 35;
	optional int32 bpHeartbeatVer = 36;
	optional int32 bpTimestamp = 37;
	optional float bpRealSoc = 38;
	optional float bpRealSoh = 39;
	optional int32 bpGlobalProtect = 40;
	optional int32 bpDownLimitSoc = 41;
	optional int32 bpUpLimitSoc = 42;
	optional int32 bpActiveCalReqStat = 43;
	optional int32 bpActiveCalRunStat = 44;
	optional int32 moduleProductInfo = 45;
	optional int32 moduleProgramSta = 46;
	optional int32 moduleAplSwVer = 47;
	optional int32 moduleLoaderSwVer = 48;
	optional int32 bmsRunSta = 49; // 1= PB_BMS_STATE_NORMAL
	optional int32 bmsChgDsgSta = 50; // 0=PB_DSG_STATE
	optional int32 dabModSta = 51; // 0= PB_MOD_STA_NORMAL
	optional int32 bpChgSop = 52;
	optional int32 bpDsgSop = 53;
	optional float bpRemainWatth = 54;
	optional float bpTargetSoc = 55;
	optional float bpDiffSoc = 56;
	optional float bpMaxSoc = 57;
	optional float bpMinSoc = 58;
	optional float bpLimitSoc = 59;
	optional float bpCalendarSoh = 60;
	optional float bpCycleSoh = 61;
	optional int32 bpAcRechargeFlag = 62;
	optional int32 bpPtcHeatFlag = 63;
	optional int32 bpPtcExitEvent = 64; // 0=PB_PTC_OT_STATE
	optional int32 bpAccuChgEnergy = 65;
	optional int32 bpAccuDsgEnergy = 66;
	optional float bpPtcTemp2 =67;
	optional int32 bpSysState = 68; // 2=NORMAL_STATE
}

message JTS1_BP_STA_REPORT {
	repeated bpStaReport bpSta = 1;
}

message JTS1_ERROR_CODE_MASK_REPORT {
	repeated int32 errorCode =1;
}

message JTS1_brightness {
	optional int32 unknown1 = 1;
	optional int32 brightness = 2;
}


//packetType cmdId = 33 unknown deviceType cmdFunc = 209
message evPulseList {
	repeated string evSerial = 1;
}

//cmdId = 8 unknown deviceType cmdFunc = 209
message evPulse_report {
	optional string evSerial = 1;
	optional float unknown2 =2; // power ?
	optional int32 unknown3 =3;
	optional int32 unknown4 =4;
	optional int32 unknown5 =5;
	optional int32 unknown6 =6;
	repeated bytes unknown7 =7;
	optional float unknown8 =8; // power?
	optional float energyCharged9 =9; //energy loaded kWh
	optional int32 unknown10 =10;
	optional int32 unknown11 =11; //energy loaded Wh?
	optional int32 unknown12 =12;
	optional string unknwon13 = 13;
	repeated bytes unknown14 =14;
	optional int32 unixtimeChargeStart15 =15; //charging time start
	optional int32 unixtimeChargeStop16 =16; //charge time stop
	optional int32 unknown17 =17;
	optional int32 unknown30 =30;
	optional int32 unknown31 =31;
	optional int32 unknown32 =32;
	optional int32 unknown33 =33;
	optional int32 unknown34 =34;
}

message evPulse_status {
	optional int32 unknown2 =2;
	optional int32 unknown3 =3;
	optional int32 unknown4 =4;
	optional int32 unknown5 =5;
	optional int32 unknown6 =6;
	optional int32 unknown7 =7;
	optional int32 unknown8 =8;
	repeated bytes error9 =9;
}

//cmdId = 2 unknown deviceType cmdFunc = 209
message evPulse_heartbeat {
	optional string evSerial = 1;
	optional evPulse_status evPulse_status  = 2;
}

//dp3
message cmdFunc254_cmdId22_Report {
	optional int32 unknown21 = 21;
	optional int32 unknown24 = 24;
    optional float unknown26 = 26;
    optional float unknown27 = 27;
    optional float unknown28 = 28;
    optional float unknown29 = 29;
    optional float unknown41 = 41;
    optional float unknown44 = 44;
    optional float unknown59 = 59;
    optional int32 unknown60 = 60;
    optional int32 unknown66 = 66;
    optional float unknown67 = 67;
    optional float voltage68 = 68; //voltage 119V
    optional float current69 = 69; //current?
    optional float voltage149 = 149; //voltage 24V?
    optional float current150 = 150; //current?
    optional float voltage151 = 151; //voltage 119V output ?
    optional float unknown167 = 167;
    optional float unknown168 = 168;
    optional float unknown169 = 169; //power ?
    optional int32 unknown172 = 172;
	optional int32 unknown173 = 173;
    optional int32 unknown174 = 174;
	optional int32 unknown175 = 175;
    optional int32 unknown176 = 176; //status?
	optional int32 unknown177 = 177; //status?
    optional int32 unknown178 = 178; //status?
	optional int32 unknown179 = 179; //status?
    optional float unknown196 = 196;
    optional float voltage197 = 197; //voltage 119V
    optional float unknown198 = 198;
    optional float unknown199 = 199;
    optional float unknown201 = 201;
    optional int32 unknown220 = 220; //
    optional float unknown221 = 221;
    optional float unknown222 = 222;
    optional float unknown223 = 223;
    optional float unknown224 = 224;
    optional float unknown225 = 225;
    optional int32 unknown231 = 231; //
    optional float unknown239 = 239;
    optional float unknown240 = 240;
    optional int32 unknown241 = 241; //
    optional float voltage244 = 244; //voltage battery 52V or inv/pd/ems
    optional float unknown245 = 245; //current -0,32A
    optional int32 unknown246 = 246; //
    optional int32 unknown247 = 247; // full capacity 80000mAh
    optional int32 unknown249 = 249; // remaining capacity 26400mAh ?
    optional int32 unknown250 = 250; // 
    optional int32 unknown251 = 251; // 
    optional int32 unknown252 = 252; // 
    optional int32 unknown253 = 253; // 
    optional int32 unknown256 = 256; // min vol batt 3309 -> 3,309V
    optional int32 unknown257 = 257; // max vol batt 3313 -> 3,313V
    optional float voltage264 = 264; // voltage battery 52V or inv/pd/ems
    optional float unknown265 = 265; // current -0,36A
    optional float voltage266 = 266; // voltage battery 54V or inv/pd/ems
    optional float unknown267 = 267; // 60% oilstart?
    optional int32 unknown276 = 276; //
    optional int32 unknown277 = 277; //
    optional int32 unknown278 = 278; //
    optional int32 unknown279 = 279; //
    optional int32 unknown280 = 280; //
    optional int32 unknown291 = 291; //
    optional int32 unknown292 = 292; //
    optional int32 unknown293 = 293; // 120000
    optional int32 unknown294 = 294; // 2000
    optional int32 unknown295 = 295; // 300000
    optional int32 unknown296 = 296; // 60000
    optional float voltage318 = 318; // voltage battery 56V or inv/pd/ems
    optional float unknown337 = 337; // 80% charge max?
    optional float unknown338 = 338; // 
    optional float unknown339 = 339; // 
    optional float unknown340 = 340; // current?
    optional float voltage341 = 341; // voltage 52,4V
    optional float unknown342 = 342; // current
    optional int32 unknown343 = 343; //
    optional int32 unknown344 = 344; //
    optional int32 unknown345 = 345; //
    optional int32 unknown346 = 346; //
    optional int32 unknown347 = 347; //
    optional int32 unknown348 = 348; //
    optional int32 unknown349 = 349; //
    optional int32 unknown350 = 350; //
    optional int32 unknown351 = 351; //
    optional float unknown352 = 352; // 
    optional float unknown353 = 353; // 
    optional float unknown354 = 354; // 
    optional float unknown369 = 369; // power mppt? 440W
    optional int32 unknown370 = 370; //
    optional int32 unknown371 = 371; //
    optional int32 unknown372 = 372; //
    optional int32 unknown373 = 373; //
    optional int32 unknown374 = 374; //
    optional int32 unknown375 = 375; //
    optional float unknown376 = 376; // %
    optional float unknown377 = 377; // 57,25V mppt
    optional float unknown378 = 378; // power mppt
    optional float unknown382 = 382; //
    optional float unknown383 = 383; //
    optional float unknown384 = 384; //
    optional float unknown385 = 385; //    
    optional float unknown386 = 386; //  
    optional float unknown387 = 387; //  
    optional float unknown388 = 388; //
    optional float unknown389 = 389; //    
    optional float unknown390 = 390; //  
    optional float unknown391 = 391; //  
}

message set_dp3 {
    optional int32 switchACoutHvCmd = 15;
    optional int32 switchACoutLvCmd = 16;
    optional int32 switch12VdcCmd = 18;
    optional int32 switchXboostCmd = 25;
    optional int32 levelChargeLimitCmd = 33;
    optional int32 levelDisChargeLimitCmd = 34;
    optional int32 level12VchargeCmd = 52;
    optional int32 level48VchargeCmd = 53;
    optional int32 levelACchargeSpeedCmd = 54;
    optional int32 levelACpowerInOutCmd = 56;
    optional int32 switchGFCIRCDCmd = 61;
}

message setReply_dp3 {
    optional int32 cmdId = 1;
    optional int32 ack = 2;
    optional int32 switchACoutHvStatus = 15;
    optional int32 switchACoutLvStatus = 16;
    optional int32 switch12VdcStatus = 18;
    optional int32 switchXboostStatus = 25;
    optional int32 levelChargeLimitStatus = 33;
    optional int32 levelDisChargeLimitStatus = 34;
    optional int32 level12VchargeStatus = 52; //seen as 0 instead 7
    optional int32 level48VchargeStatus = 53; //seen as 0 instead 17
    optional int32 levelACchargeSpeedStatus = 54;
    optional int32 levelACpowerInOutStatus = 56;
    optional int32 switchGFCIRCDStatus = 61;
}

//ALTERNATOR

message alternatorHeartbeat {
	optional int32 status1 =1;
	optional int32 temp = 102;
	optional float actPower = 105;
	optional int32 unknown130 = 130;
	optional int32 startVoltage = 138; // *0.1
	optional float carBatVolt = 139;
	optional float batSoc = 262;
	optional int32 unknown268 = 268;
	optional int32 unknown269 = 269;
	optional float current425 = 425;
	optional int32 unknown427 = 427;
	optional int32 unknown428 = 428;
	optional int32 operationMode = 581;
	optional int32 startStop = 597;
	optional float permanentWatts = 598;
	optional float wifiRssi = 602;
	optional float ratedPower = 603;
	optional float unknown608 = 608;
	optional float unknown609 = 609;
}

message alternatorSet {
	optional int32 operationModeCmd = 116; // 1=Charge; 2=reverse charge; 3=battery maintenance;
	optional int32 startStopCmd = 122; // 0=off; 1= on
	optional float permanentWattsCmd = 123; // 0 - 800 Watt
	optional int32 startVoltageCmd = 137; // 11 - 30 V *10
}

`;

function decodeMsg(hexString, msgtype) {
	try {
		const root = protobuf.parse(protoSource).root;
		const PowerMessage = root.lookupType(msgtype);
		//const message = PowerMessage.decode(hexString);
		/*global Buffer*/
		/*eslint no-undef: "error"*/
		const message = PowerMessage.decode(Buffer.from(hexString, 'hex'));
		const object = PowerMessage.toObject(message, { defaults: false });
		return object;
	} catch (error) {
		throw new Error('decodeMsg -> ' + error);
	}
}
/**
 * @param {object} stateDictObj
 * @param {string} channel
 * @param {string} state
 * @param {string | number | boolean} value
 * @param {object} stateObj
 */
function convertData(stateDictObj, channel, state, value, stateObj) {
	let key = stateDictObj[channel][state]['entity'];
	if (value !== '' && value != null) {
		let val = value.toString();
		switch (key) {
			case 'number':
			case 'level':
				//convert number
				if (Number.isInteger(value) || typeof value === 'string' || value instanceof String) {
					if (state !== 'brightness') {
						value = parseFloat(value) * stateObj[channel][key][state]['mult'];
					} else {
						value = parseInt(String(value * stateObj[channel][key][state]['mult']));
					}
				}
				break;
			case 'string':
				value = value.toString();
				break;
			case 'switch':
				//convert false/true
				if (value == 0 || value == false || value == '0') {
					value = false;
				} else value = true;
				break;
			case 'diagnostic':
				//convert string to item

				if (Object.prototype.hasOwnProperty.call(stateObj[channel][key][state][state], val)) {
					value = stateObj[channel][key][state][state][val].toString();
				} else {
					value = val + ' not part of array';
				}
				break;
			case 'array':
				//convert false/treue
				value = JSON.stringify(value);
				break;
			default:
				break;
		}
	}

	return value;
}

/*
pstream umbauen, damit Antworten mit mehr als einer Nachricht auch verarbeitet werden
Rückgabe der decodierung als Object
abspeichern mit loop durch Objekt

*/

function pstreamDecode(adapter, payload, usage, topic, msgtype, log) {
	// @ts-ignore
	const buf = new Buffer.from(payload, 'base64');
	try {
		if (log === true) {
			adapter.log.debug(
				'[PROTOBUF decode] ' + topic + ' [' + msgtype + '] raw (hex): ' + payload.toString('hex')
			);
		}

		let msgobj = decodeMsg(buf, 'HeaderMessage');
		if (msgobj) {
			if (Array.isArray(msgobj.header)) {
				let returnobj = {};
				let dbgmsg = {};
				if (log === true) {
					adapter.log.debug(
						'[PROTOBUF decode] ' +
							topic +
							' [' +
							msgtype +
							'] stream has ' +
							msgobj.header.length +
							' message(s)'
					);
				}
				for (let i = 0; i < msgobj.header.length; i++) {
					for (let info in msgobj.header[i]) {
						if (info !== 'pdata') {
							dbgmsg[info] = msgobj.header[i][info];
						}
					}
					let deviceType = msgobj.header[i].cmdFunc;
					let packetType = msgobj.header[i].cmdId;
					let src = msgobj.header[i].src;
					const seq = msgobj.header[i].seq;

					//adapter.log.debug('packetType: ' + packetType);
					if (msgobj.header[i].encType) {
						if (msgobj.header[i].encType == 1) {
							//shp2 && src == 11
							if (log === true) {
								adapter.log.debug('Message encrypted');
							}
							const typedArray = new Uint8Array(msgobj.header[i].pdata);
							const array = Array.from(typedArray);
							let modarray = [];
							for (let i = 0; i < array.length; i++) {
								modarray.push(array[i] ^ seq);
							}
							const newbuf = Buffer.from(modarray);
							msgobj.header[i].pdata = newbuf;
						}
					}
					if (log === true) {
						adapter.log.debug(
							' [PROTOBUF decode] ' +
								topic +
								' [' +
								msgtype +
								'] msg#' +
								i +
								' => ' +
								JSON.stringify(dbgmsg)
						);
					}
					if (msgobj.header[i].pdata) {
						if (log === true) {
							adapter.log.debug(
								' [PROTOBUF decode] ' +
									topic +
									' msg#' +
									i +
									' => pdata(hex) ' +
									msgobj.header[i].pdata.toString('hex')
							);
						}
					} else {
						if (log === true) {
							adapter.log.debug(
								' [PROTOBUF decode] ' + topic + ' [' + msgtype + '] msg#' + i + ' => no pdata'
							);
						}
					}
					let prototyp = '';
					if (packetType) {
						switch (packetType) {
							case 146:
								switch (deviceType) {
									case 20:
										prototyp = 'rated_power_pack';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 143:
								switch (deviceType) {
									case 20:
										prototyp = 'feed_priority_pack';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 142:
								switch (deviceType) {
									case 2:
										prototyp = 'include_plug';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								//prototyp = deviceType === 20 ? 'undef' : 'include_plug';
								break;
							case 138:
								switch (deviceType) {
									case 20:
										prototyp = 'PowerPack';
										break;
									case 2:
										prototyp = 'mesh_ctrl_pack';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								//prototyp = deviceType === 20 ? 'PowerPack' : 'mesh_ctrl_pack';
								break;
							case 137:
								switch (deviceType) {
									case 2:
										prototyp = 'max_watts_pack';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								//prototyp = deviceType === 20 ? 'undef' : 'max_watts_pack';
								break;
							case 136:
								switch (deviceType) {
									case 20:
										prototyp = 'PowerPack';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								//prototyp = deviceType === 20 ? 'PowerPack' : 'undef';
								break;
							case 135:
								switch (deviceType) {
									case 20:
										prototyp = 'brightness_pack';
										break;
									case 2:
										prototyp = 'PowerPack';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								//prototyp = deviceType === 20 ? 'brightness_pack' : 'PowerPack';
								break;
							case 134:
								//20 and 2 but not dpu
								prototyp = 'time_task_config_post';
								break;
							case 133:
								switch (deviceType) {
									case 20:
										prototyp = 'bat_upper_pack';
										break;
									case 2:
										prototyp = 'PowerPack';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								//prototyp = deviceType === 20 ? 'bat_upper_pack' : 'PowerPack'; // plug -> PowerPack?
								break;
							case 132:
								switch (deviceType) {
									case 20:
										prototyp = 'bat_lower_pack';
										break;
									case 2:
										prototyp = 'time_task_config';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								//prototyp = deviceType === 20 ? 'bat_lower_pack' : 'time_task_config';
								break;
							case 131:
								//20 and 2 but not dpu
								prototyp = 'time_task_config';
								break;
							case 130:
								switch (deviceType) {
									case 20:
										prototyp = 'supply_priority_pack';
										break;
									case 2:
										prototyp = 'brightness_pack';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								//prototyp = deviceType === 20 ? 'supply_priority_pack' : 'brightness_pack';
								break;
							case 129:
								switch (deviceType) {
									case 20:
										prototyp = 'permanent_watts_pack';
										break;
									case 2:
										prototyp = 'plug_switch_message';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								// prototyp = deviceType === 20 ? 'permanent_watts_pack' : 'plug_switch_message';
								break;
							case 119:
								switch (deviceType) {
									case 96:
										//ocean cmdFunc 96, cmdId=119
										prototyp = 'JTS1_brightness';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 117:
								switch (deviceType) {
									case 53:
										//dpu cmdFunc 53, cmdId=117
										prototyp = 'lte4g_pack';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 113:
								switch (deviceType) {
									case 53:
										//power ocean cmdFunc 53, cmdId=113
										prototyp = 'ocean_113_1_msg';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 105:
								switch (deviceType) {
									case 2:
										prototyp = 'init_pack';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 103:
								switch (deviceType) {
									case 2:
										prototyp = 'lab_pack';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 94:
								switch (deviceType) {
									case 2:
										prototyp = 'backup_pack';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 93:
								switch (deviceType) {
									case 2:
										prototyp = 'acalwaysOn_pack';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 89:
								switch (deviceType) {
									case 2:
										prototyp = 'batPreCondOn_pack';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 88:
								switch (deviceType) {
									case 2:
										prototyp = 'dischaLim_pack';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 87:
								switch (deviceType) {
									case 2:
										prototyp = 'chaLim_pack';
										break;
									case 1:
										prototyp = 'areaTown_pack';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 86:
								switch (deviceType) {
									case 1:
										prototyp = 'town_pack';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 85:
								switch (deviceType) {
									case 1: //shp
										console.log('shp time');
										prototyp = 'shp2time';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 84:
								prototyp = deviceType === 20 ? 'undef' : 'dcTimeout_pack';
								break;
							case 83:
								prototyp = deviceType === 20 ? 'undef' : 'acTimeout_pack';
								break;
							case 82:
								prototyp = deviceType === 20 ? 'undef' : 'lcdTimeout_pack';
								break;
							case 81:
								prototyp = deviceType === 20 ? 'undef' : 'deviceTimeout_pack';
								break;
							case 73:
								prototyp = deviceType === 20 ? 'undef' : 'acChargeSpeed_pack';
								break;
							case 68:
								prototyp = deviceType === 20 ? 'undef' : 'dcoutput_pack';
								break;
							case 65:
								switch (deviceType) {
									case 2:
										prototyp = 'rename_pack';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 33:
								switch (deviceType) {
									case 209:
										prototyp = 'evPulseList';
										break;
									case 96: //power ocean
										prototyp = 'JTS1_ENERGY_STREAM_REPORT';
										break;
									case 12: //shp2
										prototyp = 'shp2cmd';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 32:
								//deviceType === 254
								//prototyp = deviceType === 20 ? 'EnergyPack' : 'EnergyPack';

								switch (deviceType) {
									case 254:
										prototyp = 'EnergyPack';
										break;
									case 20:
										prototyp = 'EnergyPack';
										break;
									case 12:
										prototyp = 'ProtoPushAndSet';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 22:
								switch (deviceType) {
									case 254:
										//dp3
										prototyp = 'cmdFunc254_cmdId22_Report';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 21:
								switch (deviceType) {
									case 254:
										//alternator
										prototyp = 'alternatorHeartbeat';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 18:
								switch (deviceType) {
									case 254:
										//dp3
										prototyp = 'setReply_dp3';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 17:
								switch (deviceType) {
									case 254:
										//dp3
										prototyp = 'set_dp3';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 13:
								switch (deviceType) {
									case 96:
										prototyp = 'JTS1_EMS_PARAM_CHANGE_REPORT';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 11:
								switch (deviceType) {
									case 96:
										prototyp = 'JTS1_LOGY_DEV_REPORT';
										break;
									case 32:
										prototyp = 'country_town_message';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							//deviceType === 32
							//prototyp = deviceType === 20 ? 'undef' : 'country_town_message';
							//break;

							case 9:
								switch (deviceType) {
									case 96:
										prototyp = 'JTS1_ERROR_CODE_MASK_REPORT';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 8:
								switch (deviceType) {
									case 209:
										prototyp = 'evPulse_report';
										break;
									case 96:
										prototyp = 'JTS1_EMS_CHANGE_REPORT';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 7:
								switch (deviceType) {
									case 96:
										prototyp = 'JTS1_BP_STA_REPORT';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 4:
								switch (deviceType) {
									case 20:
										prototyp = 'undef';
										//prototyp = 'InverterHeartbeat2';
										break;
									case 2:
										prototyp = 'BPInfoReport';
										//prototyp = 'dpu_4';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;

							case 3:
								switch (deviceType) {
									case 96:
										prototyp = 'oceanConfig';
										//prototyp = 'powerocean';
										break;
									case 2:
										prototyp = 'AppParaHeartbeatReport';
										//prototyp = 'dpu_3';
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 2:
								switch (deviceType) {
									case 209:
										prototyp = 'evPulse_heartbeat';
										break;
									case 20:
										prototyp = 'time_task_config_post';
										break;
									case 2:
										if (src === 53) {
											prototyp = 'time_task_config_post';
										} else if (src === 2) {
											prototyp = 'BackendRecordHeartbeatReport';
											//prototyp = 'dpu_2';
										} else {
											prototyp = 'undef';
										}
										break;
									default:
										prototyp = 'undef';
										break;
								}
								break;
							case 1:
								switch (deviceType) {
									case 96:
										//power ocean
										prototyp = 'JTS1_EMS_HEARTBEAT';
										break;
									case 20:
										prototyp = 'inverter_heartbeat';
										break;
									case 12:
										prototyp = 'ProtoTime';
										break;
									case 2:
										if (src === 53) {
											prototyp = 'plug_heartbeat';
										} else if (src === 2) {
											prototyp = 'AppShowHeartbeatReport';
											//prototyp = 'dpu_1';
										} else {
											prototyp = 'undef';
										}
										break;
									default:
										prototyp = 'undef';
										break;
								}
								//prototyp = deviceType === 20 ? 'inverter_heartbeat' : 'plug_heartbeat';
								break;
							default:
								// not decodeable packet
								prototyp = 'undef';
								break;
						}
						let msg = null;
						if (prototyp !== 'undef') {
							try {
								if (msgobj.header[i].pdata) {
									msg = decodeMsg(msgobj.header[i].pdata, prototyp);
									if (log === true) {
										adapter.log.debug(
											' [PROTOBUF decode] ' +
												topic +
												' [' +
												msgtype +
												'] msg#' +
												i +
												' => ' +
												JSON.stringify(msg)
										);
									}

									returnobj[prototyp] = msg;
								} else {
									if (log === true) {
										adapter.log.debug(
											'[PROTOBUF decode] ' +
												topic +
												' [' +
												msgtype +
												'] msg#' +
												i +
												' => ' +
												' no pdata : ' +
												JSON.stringify(msgobj.header[i])
										);
									}
								}
							} catch (error) {
								adapter.log.debug(
									'[PROTOBUF decode] ' +
										topic +
										' [' +
										msgtype +
										'] msg#' +
										i +
										' => ' +
										' id ' +
										prototyp +
										' error at: ' +
										error
								);
							}
						} else {
							if (log === true) {
								adapter.log.debug(
									'[PROTOBUF decode] ' +
										topic +
										' [' +
										msgtype +
										'] msg#' +
										i +
										' Pstream unknown packetType cmdId = ' +
										packetType +
										' cmdFunc= ' +
										deviceType
								);
								adapter.log.debug(
									'[PROTOBUF decode] ' +
										topic +
										' [' +
										msgtype +
										'] msg#' +
										i +
										' Pstream device: ' +
										msgobj.header[i].deviceSn
								);
								if (msgobj.header[i].pdata) {
									adapter.log.debug(
										'[PROTOBUF decode] ' +
											topic +
											' [' +
											msgtype +
											'] msg#' +
											i +
											' pdata: ' +
											msgobj.header[i].pdata.toString('hex')
									);
								}
							} else if (deviceType !== 20 && deviceType !== 2) {
								adapter.log.debug(
									'[PROTOBUF decode] ' +
										topic +
										' [' +
										msgtype +
										'] msg#' +
										i +
										' unknown packetType cmdId = ' +
										packetType +
										' unknown deviceType cmdFunc = ' +
										deviceType
								);
								if (msgobj.header[i].pdata) {
									adapter.log.debug(
										'[PROTOBUF decode] ' +
											topic +
											' [' +
											msgtype +
											'] msg#' +
											i +
											' pdata: ' +
											msgobj.header[i].pdata.toString('hex')
									);
								}
							}
						}
						if (packetType === 32 && deviceType !== 12) {
							if (usage === 'noderedchart') {
								try {
									let msgobj32 = msg;
									//adapter.log.debug('energy:' + JSON.stringify(msgobj32));
									let chart = [
										{
											label: 'no',
											series: [],
											data: [],
											labels: [
												'1',
												'2',
												'3',
												'4',
												'5',
												'6',
												'7',
												'8',
												'9',
												'10',
												'11',
												'12',
												'13',
												'14',
												'15',
												'16',
												'17',
												'18',
												'19',
												'20',
												'21',
												'22',
												'23',
												'24'
											]
										}
									];
									for (let i = 0; i < msgobj32.sysEnergyStream.length; i++) {
										let date = new Date(msgobj32.sysEnergyStream[i].timestamp * 1000);
										chart[0].label = date.toString();
										chart[0].series.push(
											String(msgobj32.sysEnergyStream[i].watthType) +
												' ' +
												msgobj32.sysEnergyStream[i].watth.reduce((a, b) => a + b, 0)
										);
										chart[0].data.push(msgobj32.sysEnergyStream[i].watth);
									}
									return chart;
								} catch (error) {
									adapter.log.debug('id 32 error at: ' + error);
								}
							} else {
								let msgobj32 = msg;
								let watthType;
								let energy;
								let timeStamp;
								let energyobj = {};
								try {
									for (let i = 0; i < msgobj32.sysEnergyStream.length; i++) {
										if (
											msgobj32.sysEnergyStream[i].watthType &&
											msgobj32.sysEnergyStream[i].watth &&
											msgobj32.sysEnergyStream[i].timestamp
										) {
											//adapter.log.debug('complete ' + i);
											//we assume all timestamps are equal and the last is used for historical message
											timeStamp = msgobj32.sysEnergyStream[i].timestamp;
											watthType = msgobj32.sysEnergyStream[i].watthType;
											energy = msgobj32.sysEnergyStream[i].watth.reduce((a, b) => a + b, 0);
											energyobj['watth' + watthType] = energy;
										} else {
											//adapter.log.debug('incomplete');
											//incomplete telegram
										}
									}
								} catch (error) {
									adapter.log.debug('id 32 error at: ' + error);
								}
								if (msgobj32.sysSeq == 65535) {
									returnobj['energy'] = energyobj;
								} else {
									returnobj['hist_energy'] = { time: timeStamp, energy: energyobj };
								}
							}
						}
					} else {
						//message without packageType;
						if (log === true) {
							adapter.log.debug(
								'[PROTOBUF decode] ' +
									topic +
									' [' +
									msgtype +
									'] msg#' +
									i +
									' no packetType : ' +
									JSON.stringify(msgobj.header[i])
							);
						}
						if (msgobj.header[i].code) {
							if (msgobj.header[i].code == '-2') {
								returnobj['info'] = { status: 'offline' };
							}
						}
					}
				}
				adapter.quotas[topic] = returnobj;
				return returnobj;
			}
		}
	} catch (error) {
		adapter.log.debug('[PROTOBUF decode] error -> payload was: ' + payload.toString('hex'));
		throw new Error('[PROTOBUF decode] ->  ' + error);
	}
}

async function setOnlineStatus(adapter, topic) {
	let status = await adapter.getStateAsync(topic + '.info.status').catch((e) => {
		adapter.log.warn('did not get old value .info.status ->' + e);
	});
	if (status && status.val === 'offline') {
		await adapter.setStateAsync(topic + '.info.status', { val: 'online', ack: true });
		adapter.log.info('[EF] ' + topic + ' is online with cloud');
	}
}

async function setOfflineStatus(adapter, topic) {
	let status = await adapter.getStateAsync(topic + '.info.status').catch((e) => {
		adapter.log.warn('did not get old value .info.status ->' + e);
	});
	if (status && status.val === 'online') {
		await adapter.setStateAsync(topic + '.info.status', {
			val: 'offline',
			ack: true
		});
		adapter.log.info('[EF] ' + topic + ' is OFFLINE with cloud');
	}
}

async function storeStreamPayload(adapter, stateDictObj, stateObj, topic, payload, devtype, haenable, logged) {
	let haUpdate = [];
	if (payload) {
		//	try {
		/*
			if (adapter.config.msgUpdatePstream) {
				adapter.log.debug(
					'got topic ' + topic + ' ( stateDictObj ' + stateDictObj + ' stateObj: ' + stateObj + ' )'
				);
			}
			*/
		if (stateDictObj) {
			if (stateObj) {
				for (let channel in payload) {
					//other incomming data is ignored (EnergyPack/PowerPack/timeConfig...)
					switch (channel) {
						case 'plug_heartbeat':
						case 'inverter_heartbeat':
						case 'InverterHeartbeat2': //to delete
						case 'energy':
						case 'AppParaHeartbeatReport':
						case 'AppShowHeartbeatReport':
						case 'BackendRecordHeartbeatReport':
						case 'JTS1_ENERGY_STREAM_REPORT':
						case 'alternatorHeartbeat':
							// all cases without nested states
							await setOnlineStatus(adapter, topic);
							for (let state in payload[channel]) {
								let val;
								let haupd;
								val = payload[channel][state];
								haupd = await compareUpdate(
									adapter,
									stateDictObj,
									stateObj,
									haenable,
									topic,
									channel,
									state,
									val,
									channel,
									logged
								);
								if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
							}
							break;
						case 'BPInfoReport':
							await setOnlineStatus(adapter, topic);
							//BPInfo mit bpNo verknüpfen
							for (let i = 0; i < payload[channel]['bpInfo'].length; i++) {
								//BPInfo mit bpNo verknüpfen, wenn 1 dann ohne Anhang wegen Kompatibilität
								let name =
									payload[channel]['bpInfo'][i]['bpNo'] == 1
										? 'BPInfo'
										: ''.concat('BPInfo', String(payload[channel]['bpInfo'][i]['bpNo']));
								for (let state in payload[channel]['bpInfo'][i]) {
									let val;
									let haupd;
									val = payload[channel]['bpInfo'][i][state];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										name, //channel,
										state,
										val,
										'BPInfo', //channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
								}
							}
							break;
						case 'JTS1_BP_STA_REPORT':
							await setOnlineStatus(adapter, topic);
							for (let i = 0; i < payload[channel]['bpSta'].length; i++) {
								for (let state in payload[channel]['bpSta'][i]) {
									let val;
									let haupd;
									val = payload[channel]['bpSta'][i][state];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										'statusReportBattery' + (i + 1),
										state,
										val,
										'statusReportBattery1',
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
								}
							}
							break;
						case 'JTS1_EMS_HEARTBEAT':
							await setOnlineStatus(adapter, topic);
							for (let state in payload[channel]) {
								switch (state) {
									case 'pcsAPhase':
									case 'pcsBPhase':
									case 'pcsCPhase':
										for (let neststate in payload[channel][state]) {
											let val;
											let haupd;
											val = payload[channel][state][neststate];
											haupd = await compareUpdate(
												adapter,
												stateDictObj,
												stateObj,
												haenable,
												topic,
												channel,
												state.concat('_', neststate),
												val,
												channel,
												logged
											);
											if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										}
										break;
									case 'mpptHeartBeat':
										if (Object.prototype.hasOwnProperty.call(payload[channel][state], 'mpptPv')) {
											for (let i = 0; i < payload[channel][state]['mpptPv'].length; i++) {
												for (let neststate in payload[channel][state]['mpptPv'][i]) {
													let val;
													let haupd;
													val = payload[channel][state]['mpptPv'][i][neststate];
													haupd = await compareUpdate(
														adapter,
														stateDictObj,
														stateObj,
														haenable,
														topic,
														channel,
														state.concat('_mpptPv_', neststate, String(i)),
														val,
														channel,
														logged
													);
													if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
												}
											}
										}
										if (
											Object.prototype.hasOwnProperty.call(payload[channel][state], 'mpptTempVal')
										) {
											let val;
											let haupd;
											val = payload[channel][state]['mpptTempVal'];
											haupd = await compareUpdate(
												adapter,
												stateDictObj,
												stateObj,
												haenable,
												topic,
												channel,
												state.concat('_', 'mpptTempVal'),
												val,
												channel,
												logged
											);
											if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										}
										if (
											Object.prototype.hasOwnProperty.call(
												payload[channel][state],
												'mpptInsResist'
											)
										) {
											let val;
											let haupd;
											val = payload[channel][state]['mpptInsResist'];
											haupd = await compareUpdate(
												adapter,
												stateDictObj,
												stateObj,
												haenable,
												topic,
												channel,
												state.concat('_', 'mpptInsResist'),
												val,
												channel,
												logged
											);
											if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										}
										break;
									default:
										//directly accessibly datapoints
										//noch nicht definiert als datenpunkt
										/*
										val = payload[channel][state];
										haupd = await compareUpdate(
											adapter,
											stateDictObj,
											stateObj,
											haenable,
											topic,
											channel,
											state,
											val,
											channel,
											logged
										);
										if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										*/
										break;
								}
							}
							break;
						case 'JTS1_EMS_CHANGE_REPORT':
							await setOnlineStatus(adapter, topic);
							for (let state in payload[channel]) {
								let val;
								let haupd;
								switch (state) {
									case 'bpSoc':
									case 'bpTotalChgEnergy':
									case 'bpTotalDsgEnergy':
										val = payload[channel][state];
										haupd = await compareUpdate(
											adapter,
											stateDictObj,
											stateObj,
											haenable,
											topic,
											channel,
											state,
											val,
											channel,
											logged
										);
										if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										break;
									default:
										//the other datapoints are not defined yet
										break;
								}
							}
							break;
						case 'ProtoTime':
							await setOnlineStatus(adapter, topic);
							for (let state in payload[channel]) {
								let val;
								let haupd;
								switch (state) {
									case 'masterInfo':
										if (
											Object.prototype.hasOwnProperty.call(
												payload[channel]['masterInfo'],
												'gridWatt'
											)
										) {
											val = payload[channel][state]['gridWatt'];
											haupd = await compareUpdate(
												adapter,
												stateDictObj,
												stateObj,
												haenable,
												topic,
												channel,
												'master_gridWatt',
												val,
												channel,
												logged
											);
											if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										}
										if (
											Object.prototype.hasOwnProperty.call(
												payload[channel]['masterInfo'],
												'sysTimezone'
											)
										) {
											val = payload[channel][state]['sysTimezone'];
											haupd = await compareUpdate(
												adapter,
												stateDictObj,
												stateObj,
												haenable,
												topic,
												channel,
												'sysTimezone',
												val,
												channel,
												logged
											);
											if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										}
										if (
											Object.prototype.hasOwnProperty.call(
												payload[channel]['masterInfo'],
												'timezoneId'
											)
										) {
											val = payload[channel][state]['timezoneId'];
											haupd = await compareUpdate(
												adapter,
												stateDictObj,
												stateObj,
												haenable,
												topic,
												channel,
												'timezoneId',
												val,
												channel,
												logged
											);
											if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										}
										break;
									case 'loadInfo':
										if (
											Object.prototype.hasOwnProperty.call(
												payload[channel]['loadInfo'],
												'hall1Watt'
											)
										) {
											val = payload[channel][state]['hall1Watt'];
											haupd = await compareUpdate(
												adapter,
												stateDictObj,
												stateObj,
												haenable,
												topic,
												channel,
												'hall1Watt',
												val,
												channel,
												logged
											);
											if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
											let power = 0;
											for (let i = 0; i < val.length; i++) {
												haupd = await compareUpdate(
													adapter,
													stateDictObj,
													stateObj,
													haenable,
													topic,
													'loadPower',
													'chWatt'.concat('_', String(i)),
													val[i],
													'loadPower',
													logged
												);
												power = power + val[i];
												if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
											}
											haupd = await compareUpdate(
												adapter,
												stateDictObj,
												stateObj,
												haenable,
												topic,
												'loadPower',
												'sumWatt',
												power,
												'loadPower',
												logged
											);
											if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										}
										if (
											Object.prototype.hasOwnProperty.call(
												payload[channel]['loadInfo'],
												'hall1Curr'
											)
										) {
											val = payload[channel][state]['hall1Curr'];
											haupd = await compareUpdate(
												adapter,
												stateDictObj,
												stateObj,
												haenable,
												topic,
												channel,
												'hall1Curr',
												val,
												channel,
												logged
											);
											if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
											let current = 0;
											for (let i = 0; i < val.length; i++) {
												haupd = await compareUpdate(
													adapter,
													stateDictObj,
													stateObj,
													haenable,
													topic,
													'loadCurrent',
													'cur'.concat('_', String(i)),
													val[i],
													'loadCurrent',
													logged
												);
												current = current + val[i];
												if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
											}
											haupd = await compareUpdate(
												adapter,
												stateDictObj,
												stateObj,
												haenable,
												topic,
												'loadCurrent',
												'sumCur',
												current,
												'loadCurrent',
												logged
											);
											if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										}
										break;
									case 'backupInfo':
										if (
											Object.prototype.hasOwnProperty.call(
												payload[channel]['backupInfo'],
												'chWatt'
											)
										) {
											val = payload[channel][state]['chWatt'];
											haupd = await compareUpdate(
												adapter,
												stateDictObj,
												stateObj,
												haenable,
												topic,
												channel,
												'bkpChWatt',
												val,
												channel,
												logged
											);
											if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										}
										if (
											Object.prototype.hasOwnProperty.call(
												payload[channel]['backupInfo'],
												'backupDischargeTime'
											)
										) {
											val = payload[channel][state]['backupDischargeTime'];
											haupd = await compareUpdate(
												adapter,
												stateDictObj,
												stateObj,
												haenable,
												topic,
												channel,
												'backupDischargeTime',
												val,
												channel,
												logged
											);
											if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										}
										if (
											Object.prototype.hasOwnProperty.call(
												payload[channel]['backupInfo'],
												'energy_1'
											)
										) {
											if (
												Object.prototype.hasOwnProperty.call(
													payload[channel]['backupInfo']['energy_1'],
													'chargeTime'
												)
											) {
												val = payload[channel][state]['energy_1']['chargeTime'];
												haupd = await compareUpdate(
													adapter,
													stateDictObj,
													stateObj,
													haenable,
													topic,
													channel,
													'bkpEnerg1ChargeTime',
													val,
													channel,
													logged
												);
												if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
											}
											if (
												Object.prototype.hasOwnProperty.call(
													payload[channel]['backupInfo']['energy_1'],
													'dischargeTime'
												)
											) {
												val = payload[channel][state]['energy_1']['dischargeTime'];
												haupd = await compareUpdate(
													adapter,
													stateDictObj,
													stateObj,
													haenable,
													topic,
													channel,
													'bkpEnerg1DischargeTime',
													val,
													channel,
													logged
												);
												if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
											}
										}
										if (
											Object.prototype.hasOwnProperty.call(
												payload[channel]['backupInfo'],
												'energy_2'
											)
										) {
											if (
												Object.prototype.hasOwnProperty.call(
													payload[channel]['backupInfo']['energy_2'],
													'chargeTime'
												)
											) {
												val = payload[channel][state]['energy_2']['chargeTime'];
												haupd = await compareUpdate(
													adapter,
													stateDictObj,
													stateObj,
													haenable,
													topic,
													channel,
													'bkpEnerg2ChargeTime',
													val,
													channel,
													logged
												);
												if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
											}
											if (
												Object.prototype.hasOwnProperty.call(
													payload[channel]['backupInfo']['energy_2'],
													'dischargeTime'
												)
											) {
												val = payload[channel][state]['energy_2']['dischargeTime'];
												haupd = await compareUpdate(
													adapter,
													stateDictObj,
													stateObj,
													haenable,
													topic,
													channel,
													'bkpEnerg2DischargeTime',
													val,
													channel,
													logged
												);
												if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
											}
										}
										break;
									case 'wattInfo':
										if (
											Object.prototype.hasOwnProperty.call(
												payload[channel]['wattInfo'],
												'gridWatt'
											)
										) {
											val = payload[channel][state]['gridWatt'];
											haupd = await compareUpdate(
												adapter,
												stateDictObj,
												stateObj,
												haenable,
												topic,
												channel,
												'wattInfoGridWatt',
												val,
												channel,
												logged
											);
											if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										}
										if (
											Object.prototype.hasOwnProperty.call(payload[channel]['wattInfo'], 'chWatt')
										) {
											val = payload[channel][state]['chWatt'];
											haupd = await compareUpdate(
												adapter,
												stateDictObj,
												stateObj,
												haenable,
												topic,
												channel,
												'wattInfoChWatt',
												val,
												channel,
												logged
											);
											if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										}
										if (
											Object.prototype.hasOwnProperty.call(
												payload[channel]['wattInfo'],
												'allHallWatt'
											)
										) {
											val = payload[channel][state]['allHallWatt'];
											haupd = await compareUpdate(
												adapter,
												stateDictObj,
												stateObj,
												haenable,
												topic,
												channel,
												'wattInfoAllHallWatt',
												val,
												channel,
												logged
											);
											if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										}
										break;
									case 'masterVerInfo':
										if (
											Object.prototype.hasOwnProperty.call(
												payload[channel]['masterVerInfo'],
												'appMainVer'
											)
										) {
											val = payload[channel][state]['appMainVer'];
											haupd = await compareUpdate(
												adapter,
												stateDictObj,
												stateObj,
												haenable,
												topic,
												channel,
												'appMainVer',
												val,
												channel,
												logged
											);
											if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										}
										if (
											Object.prototype.hasOwnProperty.call(
												payload[channel]['masterVerInfo'],
												'appDbgVer'
											)
										) {
											val = payload[channel][state]['appDbgVer'];
											haupd = await compareUpdate(
												adapter,
												stateDictObj,
												stateObj,
												haenable,
												topic,
												channel,
												'appDbgVer',
												val,
												channel,
												logged
											);
											if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										}
										if (
											Object.prototype.hasOwnProperty.call(
												payload[channel]['masterVerInfo'],
												'appTestVer'
											)
										) {
											val = payload[channel][state]['appTestVer'];
											haupd = await compareUpdate(
												adapter,
												stateDictObj,
												stateObj,
												haenable,
												topic,
												channel,
												'appTestVer',
												val,
												channel,
												logged
											);
											if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										}
										break;
									default:
										break;
								}
							}
							break;
						case 'ProtoPushAndSet':
							await setOnlineStatus(adapter, topic);
							for (let state in payload[channel]) {
								let val;
								let haupd;
								switch (state) {
									case 'LoadStrategyCfg':
										for (let neststate in payload[channel][state]) {
											let val;
											let haupd;
											if (
												neststate === 'hall1ChInfo' &&
												payload[channel][state]['hall1ChInfo'].length === 12
											) {
												for (let i = 0; i < 12; i++) {
													if (payload[channel][state]['hall1ChInfo'][i]['loadIsEnable']) {
														val = payload[channel][state]['hall1ChInfo'][i]['loadIsEnable'];
														haupd = await compareUpdate(
															adapter,
															stateDictObj,
															stateObj,
															haenable,
															topic,
															state,
															'loadIsEnable' + (i + 1),
															val,
															state,
															logged
														);
														if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
													}
													if (payload[channel][state]['hall1ChInfo'][i]['loadPriority']) {
														val = payload[channel][state]['hall1ChInfo'][i]['loadPriority'];
														haupd = await compareUpdate(
															adapter,
															stateDictObj,
															stateObj,
															haenable,
															topic,
															state,
															'loadPriority' + (i + 1),
															val,
															state,
															logged
														);
														if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
													}
												}
											} else {
												val = payload[channel][state][neststate];
												haupd = await compareUpdate(
													adapter,
													stateDictObj,
													stateObj,
													haenable,
													topic,
													state,
													neststate,
													val,
													state,
													logged
												);
												if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
											}
										}
										break;
									case 'backupIncreInfo':
										for (let neststate in payload[channel][state]) {
											let val;
											let haupd;

											if (
												neststate === 'Energy1Info' ||
												neststate === 'Energy2Info' ||
												neststate === 'Energy3Info'
											) {
												for (let dp in payload[channel][state][neststate]) {
													let val;
													let haupd;
													if (dp === 'devInfo') {
														//todo define dps first
													} else {
														val = payload[channel][state][neststate][dp];
														haupd = await compareUpdate(
															adapter,
															stateDictObj,
															stateObj,
															haenable,
															topic,
															neststate, //nested the state is channel
															dp,
															val,
															neststate, //'EnergyInfo',
															logged
														);
														if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
													}
												}
											} else if (
												neststate === 'backupCh1Info' ||
												neststate === 'backupCh2Info' ||
												neststate === 'backupCh3Info'
											) {
												for (let dp in payload[channel][state][neststate]) {
													let val;
													let haupd;
													val = payload[channel][state][neststate][dp];
													haupd = await compareUpdate(
														adapter,
														stateDictObj,
														stateObj,
														haenable,
														topic,
														neststate, //nested the state is channel
														dp,
														val,
														neststate,
														logged //'backupChInfo'
													);
													if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
												}
											} else if (neststate === 'DeltaPro1Info' || neststate === 'DeltaPro2Info') {
												for (let dp in payload[channel][state][neststate]) {
													let val;
													let haupd;
													if (dp === 'modelInfo') {
														//todo define dps first
													} else {
														val = payload[channel][state][neststate][dp];
														haupd = await compareUpdate(
															adapter,
															stateDictObj,
															stateObj,
															haenable,
															topic,
															neststate, //nested the state is channel
															dp,
															val,
															neststate,
															logged //'DeltaProInfo'
														);
														if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
													}
												}
											} else if (neststate === 'errcode') {
												//todo
											} else {
												//no nesting
												val = payload[channel][state][neststate];
												haupd = await compareUpdate(
													adapter,
													stateDictObj,
													stateObj,
													haenable,
													topic,
													state,
													neststate,
													val,
													state,
													logged
												);
												if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
											}
										}

										break;
									case 'loadIncreInfo':
										for (let neststate in payload[channel][state]['hall1IncreInfo']) {
											let val;
											let haupd;
											if (
												neststate.includes('ch') &&
												(neststate.includes('Info') || neststate.includes('Sta'))
											) {
												for (let dp in payload[channel][state]['hall1IncreInfo'][neststate]) {
													if (dp === 'splitphase') {
														if (
															Object.prototype.hasOwnProperty.call(
																payload[channel][state]['hall1IncreInfo'][neststate][
																	dp
																],
																'linkMark'
															)
														) {
															val =
																payload[channel][state]['hall1IncreInfo'][neststate][
																	dp
																]['linkMark'];
															haupd = await compareUpdate(
																adapter,
																stateDictObj,
																stateObj,
																haenable,
																topic,
																state,
																neststate + '_' + 'linkMark',
																val,
																state,
																logged
															);
															if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
														}
														if (
															Object.prototype.hasOwnProperty.call(
																payload[channel][state]['hall1IncreInfo'][neststate][
																	dp
																],
																'linkCh'
															)
														) {
															val =
																payload[channel][state]['hall1IncreInfo'][neststate][
																	dp
																]['linkCh'];
															haupd = await compareUpdate(
																adapter,
																stateDictObj,
																stateObj,
																haenable,
																topic,
																state,
																neststate + '_' + 'linkCh',
																val,
																state,
																logged
															);
															if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
														}
													} else {
														val = payload[channel][state]['hall1IncreInfo'][neststate][dp];
														haupd = await compareUpdate(
															adapter,
															stateDictObj,
															stateObj,
															haenable,
															topic,
															state,
															neststate + '_' + dp,
															val,
															state,
															logged
														);
														if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
													}
												}
											} else if (neststate === 'errCode' || neststate === 'modelInfo') {
												//not yet
											} else {
												val = payload[channel][state]['hall1IncreInfo'][neststate];
												haupd = await compareUpdate(
													adapter,
													stateDictObj,
													stateObj,
													haenable,
													topic,
													state,
													neststate,
													val,
													state,
													logged
												);
												if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
											}
										}
										break;
									case 'masterIncreInfo': //wie default
										for (let neststate in payload[channel][state]) {
											if (neststate === 'errCode') {
												//not yet
											} else {
												let val;
												let haupd;
												val = payload[channel][state][neststate];
												haupd = await compareUpdate(
													adapter,
													stateDictObj,
													stateObj,
													haenable,
													topic,
													state,
													neststate,
													val,
													state,
													logged
												);
												if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
											}
										}
										break;
									case 'TimeTaskCfg_1':
									case 'TimeTaskCfg_2':
									case 'TimeTaskCfg_3':
									case 'TimeTaskCfg_4':
									case 'TimeTaskCfg_5':
									case 'TimeTaskCfg_6':
									case 'TimeTaskCfg_7':
									case 'TimeTaskCfg_8':
									case 'TimeTaskCfg_9':
									case 'TimeTaskCfg_10':
										//timetask has own structure
										break;
									default:
										//directly accessibly datapoints
										val = payload[channel][state];
										haupd = await compareUpdate(
											adapter,
											stateDictObj,
											stateObj,
											haenable,
											topic,
											channel,
											state,
											val,
											channel,
											logged
										);
										if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										break;
								}
							}
							break;
						case 'time_task_config_post':
							for (let task in payload[channel]) {
								for (let item in payload[channel][task]) {
									if (item !== 'timeRange') {
										await adapter.setStateAsync(topic + '.' + channel + '.' + task + '.' + item, {
											val:
												item === 'taskIndex'
													? parseInt(payload[channel][task][item])
													: String(payload[channel][task][item]),
											ack: true
										});
									} else if (item === 'timeRange') {
										for (let range in payload[channel][task]['timeRange']) {
											if (range === 'startTime' || range === 'stopTime') {
												for (let time in payload[channel][task][item][range]) {
													await adapter.setStateAsync(
														topic +
															'.' +
															channel +
															'.' +
															task +
															'.' +
															item +
															'.' +
															range +
															'.' +
															time,
														{
															val: payload[channel][task][item][range][time],
															ack: true
														}
													);
												}
											} else {
												//taskIndex or type
												// convert type fehlt noch
												await adapter.setStateAsync(
													topic + '.' + channel + '.' + task + '.' + item + '.' + range,
													{
														val: String(payload[channel][task][item][range]),
														ack: true
													}
												);
											}
										}
									}
								}
							}
							break;
						case 'info':
							//channel info is only received when offline, no need to check the content
							await setOfflineStatus(adapter, topic);
							break;
						default:
							//nothing todo
							break;
					}
				}
			} else {
				adapter.log.warn('storeStreamPayload no stateObj');
			}
		} else {
			adapter.log.warn('storeStreamPayload no stateDictobj');
		}
		//} catch (error) {
		//	adapter.log.debug('store stream payload ' + error);
		//	adapter.log.debug('payload from ' + topic + ' was: ' + JSON.stringify(payload));
		//}
	} else {
		adapter.log.debug('nothing to process');
	}
	return haUpdate;
}

async function storeStationPayload(adapter, stateDictObj, stateObj, topic, payload, haenable, logged) {
	let haUpdate = [];
	if (payload) {
		/*
		if (adapter.config.msgUpdatePstation) {
			adapter.log.debug(
				'got topic ' + topic + ' ( stateDictObj ' + stateDictObj + ' stateObj: ' + stateObj + ' )'
			);
		}
		*/
		try {
			let payloadobj = null;
			//station cyclically receives params messages, so we can detect from here the online status
			let onlinestatus = await adapter.getStateAsync(topic + '.info.status').catch((e) => {
				adapter.log.warn('did not get old value .info.status ->' + e);
			});
			if (payload['params']) {
				//skipping the incomming data when not valid
				if (payload['params']['ems.openBmsIdx']) {
					//only valid when payload ems.openBmsIdx=1 @Deltamax
					if (payload['params']['ems.openBmsIdx'] !== 0) {
						payloadobj = payload['params'];
					}
				} else if (payload['params']['bmsMaster.bqSysStatReg']) {
					//only valid when payload bmsMaster.bqSysStatReg = 128 @Deltamax
					if (payload['params']['bmsMaster.bqSysStatReg'] !== 0) {
						payloadobj = payload['params'];
					}
				} else if (payload['params']['bms_emsStatus.openBmsIdx']) {
					//only valid when payload ems.openBmsIdx=1 @Deltamax
					if (payload['params']['bms_emsStatus.openBmsIdx'] !== 0) {
						payloadobj = payload['params'];
					}
				} else if (payload['params']['bms_bmsStatus.bqSysStatReg']) {
					//only valid when payload bmsMaster.bqSysStatReg = 128 @Deltamax
					if (payload['params']['bms_bmsStatus.bqSysStatReg'] !== 0) {
						payloadobj = payload['params'];
					}
				} else {
					payloadobj = payload['params'];
				}
				if (onlinestatus && onlinestatus.val === 'offline') {
					await adapter.setStateAsync(topic + '.info.status', { val: 'online', ack: true });
					adapter.log.info('[EF] ' + topic + ' is online with cloud');
				}
			} else if (payload['data']) {
				if (payload['data']['quotaMap']) {
					let status = 'OK';
					//skipping the incomming data when not valid
					if (payload['data']['quotaMap']['ems.openBmsIdx']) {
						if (payload['data']['quotaMap']['ems.openBmsIdx'] === 0) {
							status = 'unreliable ems';
						}
					}
					if (payload['data']['quotaMap']['bms_emsStatus.openBmsIdx']) {
						if (payload['data']['quotaMap']['bms_emsStatus.openBmsIdx'] === 0) {
							status = 'unreliable ems';
						}
					}
					if (payload['data']['quotaMap']['bmsMaster.bqSysStatReg']) {
						if (payload['data']['quotaMap']['bmsMaster.bqSysStatReg'] === 0) {
							status = 'unreliable bmsMaster';
						}
					}
					if (payload['data']['quotaMap']['bms_bmsStatus.bqSysStatReg']) {
						if (payload['data']['quotaMap']['bms_bmsStatus.bqSysStatReg'] === 0) {
							status = 'unreliable bms';
						}
					}
					if (status === 'OK') {
						payloadobj = payload['data']['quotaMap'];
					}
					if (onlinestatus && onlinestatus.val === 'offline' && payload['data']['online'] === 1) {
						await adapter.setStateAsync(topic + '.info.status', { val: 'online', ack: true });
						adapter.log.info('[EF] ' + topic + ' is online with cloud');
					}
					adapter.log.debug('[' + topic + '] processing get_reply latest quotas !');
					//storage of latest quotas to object, can then be called from sendTo
					if (!adapter.quotas[topic]) {
						adapter.quotas[topic] = payload;
					}
				} else if (payload['data']['timeTask']) {
					//logging
					//totalTaskNum als Kennung für Stations (bei SHP1 nicht dabei)
					if (payload['data']['timeTask']['totalTaskNum']) {
						await adapter.setStateAsync(topic + '.timeTask.totalTaskNum', {
							val: payload['data']['timeTask']['totalTaskNum'],
							ack: true
						});
						let taskarr = payload['data']['timeTask']['taskCfgs'];
						for (let i = 0; i < taskarr.length; i++) {
							const task = 'task' + i;
							if (taskarr[i]['taskIndex'] !== 255) {
								for (let key in taskarr[i]) {
									if (key !== 'timeScale') {
										await adapter.setStateAsync(topic + '.timeTask.' + task + '.' + key, {
											val: taskarr[i][key],
											ack: true
										});
									} else {
										//convert fehlt nich
										await adapter.setStateAsync(topic + '.timeTask.' + task + '.' + key, {
											val: JSON.stringify(taskarr[i][key]),
											ack: true
										});
									}
								}
							}
						}
						adapter.log.debug('processed get_reply timeTask !');
					}
				} else if (payload['data']['online'] === 0) {
					//station reports the data.online=0 as offline
					//it is ony part of messages with data (rquested by latestQuotas)
					let status = await adapter.getStateAsync(topic + '.info.status').catch((e) => {
						adapter.log.warn('did not get old value .info.status ->' + e);
					});
					if (status && status.val === 'online') {
						await adapter.setStateAsync(topic + '.info.status', { val: 'offline', ack: true });
						adapter.log.info('[EF] ' + topic + ' is OFFLINE with cloud');
					}
				}
			} else {
				adapter.log.debug('no params or data in payload ->' + JSON.stringify(payload));
			}
			if (payloadobj) {
				//stations with dotted syntax
				for (let comportion in payloadobj) {
					let dotted = comportion.split('.');
					let channel = dotted[0];
					let state = dotted[1];
					if (
						channel === 'latestTimeStamp' ||
						state === null ||
						channel === 'kit' ||
						channel === 'bms_kitInfo' ||
						//to avoid crashing when undefined datapoint is uncomming, better the way around to check the known and there is leftover
						channel === 'bms_bmsInfo' ||
						channel === 'bms_slave_bmsSlaveInfo_1' ||
						channel === 'bms_slave_bmsSlaveInfo_2'
					) {
						//exceptions
					} else {
						// manipulation of delta2 and delta2max
						if (channel === 'bms_bmsStatus' || channel === 'bms') {
							channel = 'bmsMaster';
						} else if (channel === 'bms_emsStatus') {
							channel = 'ems';
						} else if (channel === 'bms_slave_bmsSlaveStatus_1') {
							channel = 'bmsSlave1';
						} else if (channel === 'bms_slave_bmsSlaveStatus_2') {
							channel = 'bmsSlave2';
						}
						const channelsave = channel; // for handling the slaves when converting the value
						if (channel === 'bmsSlave1' || channel === 'bmsSlave2') {
							channel = 'bmsMaster';
						}
						if (stateDictObj[channel][state]) {
							if (stateDictObj[channel][state]['entity'] !== 'icon') {
								let value = convertData(stateDictObj, channel, state, payloadobj[comportion], stateObj);
								//adapter.log.debug('converted value ' + value);
								let old = await adapter
									.getStateAsync(topic + '.' + channelsave + '.' + state)
									.catch((e) => {
										adapter.log.warn(
											'did not get old value ' +
												topic +
												'.' +
												channelsave +
												'.' +
												state +
												' ->' +
												e
										);
									});
								//adapter.log.debug('old ' + JSON.stringify(old));
								if (!old) {
									await adapter.setStateAsync(topic + '.' + channelsave + '.' + state, {
										val: value,
										ack: true
									});
									if (haenable && stateDictObj[channel][state]['entity'] !== 'array') {
										let havalue;
										const type = stateDictObj[channel][state]['entity'];
										const enttype = stateObj[channel][type][state]['entity_type'];
										switch (enttype) {
											case 'sensor':
												havalue = String(value);
												break;
											case 'switch':
												if (value === true) {
													havalue = stateObj[channel][type][state]['payload_on'];
												} else if (value === false) {
													havalue = stateObj[channel][type][state]['payload_off'];
												}
												break;
											case 'select':
												try {
													havalue = stateObj[channel][type][state]['states'][value];
												} catch (error) {
													adapter.log.warn(
														'select problem ' +
															value +
															' not in ' +
															stateObj[channel][type][state]['states'] +
															' error -> ' +
															error
													);
												}
												break;
											case 'text':
												havalue = value;
												break;
											default:
												havalue = String(value);
												break;
										}
										haUpdate.push({
											topic:
												adapter.config.haTopic + '/' + topic + '_' + channelsave + '/' + state,
											payload: havalue
										});
									}
								} else {
									if (old.val !== value) {
										if (logged) {
											adapter.log.debug(
												'station update ' +
													'.' +
													channelsave +
													'.' +
													state +
													' ' +
													old.val +
													' -> ' +
													value
											);
										}
										await adapter.setStateAsync(topic + '.' + channelsave + '.' + state, {
											val: value,
											ack: true
										});
										if (haenable && stateDictObj[channel][state]['entity'] !== 'array') {
											let havalue;
											const type = stateDictObj[channel][state]['entity'];
											const enttype = stateObj[channel][type][state]['entity_type'];
											switch (enttype) {
												case 'sensor':
													havalue = String(value);
													break;
												case 'switch':
													if (value === true) {
														havalue = stateObj[channel][type][state]['payload_on'];
													} else if (value === false) {
														havalue = stateObj[channel][type][state]['payload_off'];
													}
													break;
												case 'select':
													try {
														havalue = stateObj[channel][type][state]['states'][value];
													} catch (error) {
														adapter.log.warn(
															'select problem ' +
																value +
																' not in ' +
																stateObj[channel][type][state]['states'] +
																' error -> ' +
																error
														);
													}
													break;
												case 'text':
													havalue = value;
													break;

												default:
													havalue = String(value);
													break;
											}
											haUpdate.push({
												topic:
													adapter.config.haTopic +
													'/' +
													topic +
													'_' +
													channelsave +
													'/' +
													state,
												payload: havalue
											});
										}
									} else {
										//even the same value switches get an update
										//strange behaviour on HA side, where the switch returns to previous position
										// achtung macht aber ordentlich last, da immer mitgeschickt
										if (haenable && stateDictObj[channel][state]['entity'] === 'switch') {
											let havalue;
											const type = stateDictObj[channel][state]['entity'];
											const enttype = stateObj[channel][type][state]['entity_type'];
											switch (enttype) {
												case 'switch':
													if (value === true) {
														havalue = stateObj[channel][type][state]['payload_on'];
													} else if (value === false) {
														havalue = stateObj[channel][type][state]['payload_off'];
													}
													break;
												default:
													break;
											}
											haUpdate.push({
												topic:
													adapter.config.haTopic + '/' + topic + '_' + channel + '/' + state,
												payload: havalue
											});
										}
									}
								}
							}
						} else {
							adapter.log.debug(
								'[store station] ' +
									topic +
									' not processed ' +
									channelsave +
									' state: ' +
									state +
									' value ' +
									payloadobj[comportion]
							);
						}
					}
				}
			}
		} catch (error) {
			adapter.log.debug('store JSON payload ' + error);
			adapter.log.debug('payload from ' + topic + ' was: ' + JSON.stringify(payload));
		}
	} else {
		adapter.log.debug('nothing to process');
	}
	return haUpdate;
}
async function compareUpdate(
	adapter,
	stateDictObj,
	stateObj,
	haenable,
	topic,
	channel,
	state,
	val,
	origchannel,
	logged
) {
	let haUpdate = {};

	try {
		if (stateDictObj) {
			if (stateDictObj[origchannel]) {
				if (stateDictObj[origchannel][state]) {
					if (stateDictObj[origchannel][state]['entity'] !== 'icon') {
						let value = null;
						try {
							value = convertData(stateDictObj, origchannel, state, val, stateObj);
						} catch (error) {
							adapter.log.debug('CONVERT went wrong ' + error);
						}
						//adapter.log.debug('converted value ' + value);
						let old = await adapter.getStateAsync(topic + '.' + channel + '.' + state).catch((e) => {
							adapter.log.warn(
								'did not get old value ' + topic + '.' + channel + '.' + state + ' ->' + e
							);
						});
						//adapter.log.debug('old ' + JSON.stringify(old));
						if (!old) {
							if (logged) {
								adapter.log.debug(
									'[Compare] force update ' + '.' + channel + '.' + state + ' -> ' + value
								);
							}
							await adapter.setStateAsync(topic + '.' + channel + '.' + state, {
								val: value,
								ack: true
							});
							if (haenable && stateDictObj[origchannel][state]['entity'] !== 'array') {
								let havalue;
								const type = stateDictObj[origchannel][state]['entity'];
								const enttype = stateObj[origchannel][type][state]['entity_type'];
								switch (enttype) {
									case 'sensor':
										havalue = String(value);
										break;
									case 'switch':
										if (value === true) {
											havalue = stateObj[origchannel][type][state]['payload_on'];
										} else if (value === false) {
											havalue = stateObj[origchannel][type][state]['payload_off'];
										}
										break;
									case 'select':
										try {
											havalue = stateObj[origchannel][type][state]['states'][val];
										} catch (error) {
											adapter.log.warn(
												'[Compare] select problem ' +
													value +
													' not in ' +
													stateObj[origchannel][type][state]['states'] +
													' error -> ' +
													error
											);
										}
										break;
									case 'text':
										havalue = value;
										break;
									default:
										havalue = String(value);
										break;
								}
								haUpdate = {
									topic: adapter.config.haTopic + '/' + topic + '_' + channel + '/' + state,
									payload: havalue
								};
							}
						} else {
							if (Object.prototype.hasOwnProperty.call(old, 'val')) {
								if (old.val !== value) {
									if (logged) {
										adapter.log.debug(
											'[Compare] update ' +
												'.' +
												channel +
												'.' +
												state +
												' ' +
												old.val +
												' -> ' +
												value
										);
									}
									await adapter.setStateAsync(topic + '.' + channel + '.' + state, {
										val: value,
										ack: true
									});
									if (haenable && stateDictObj[origchannel][state]['entity'] !== 'array') {
										let havalue;
										const type = stateDictObj[origchannel][state]['entity'];
										const enttype = stateObj[origchannel][type][state]['entity_type'];
										switch (enttype) {
											case 'sensor':
												havalue = String(value);
												break;
											case 'switch':
												if (value === true) {
													havalue = stateObj[origchannel][type][state]['payload_on'];
												} else if (value === false) {
													havalue = stateObj[origchannel][type][state]['payload_off'];
												}
												break;
											case 'select':
												try {
													havalue = stateObj[origchannel][type][state]['states'][val];
												} catch (error) {
													adapter.log.warn(
														'[Compare] select problem ' +
															value +
															' not in ' +
															stateObj[origchannel][type][state]['states'] +
															' error -> ' +
															error
													);
												}
												break;
											case 'text':
												havalue = value;
												break;

											default:
												havalue = String(value);
												break;
										}
										haUpdate = {
											topic: adapter.config.haTopic + '/' + topic + '_' + channel + '/' + state,
											payload: havalue
										};
									}
								} else {
									//even the same value switches get an update
									//strange behaviour on HA side, where the switch returns to previous position
									// achtung macht aber ordentlich last, da immer mitgeschickt
									if (haenable && stateDictObj[origchannel][state]['entity'] === 'switch') {
										let havalue;
										const type = stateDictObj[origchannel][state]['entity'];
										const enttype = stateObj[origchannel][type][state]['entity_type'];
										switch (enttype) {
											case 'switch':
												if (value === true) {
													havalue = stateObj[origchannel][type][state]['payload_on'];
												} else if (value === false) {
													havalue = stateObj[origchannel][type][state]['payload_off'];
												}
												break;
											default:
												break;
										}
										haUpdate = {
											topic: adapter.config.haTopic + '/' + topic + '_' + channel + '/' + state,
											payload: havalue
										};
									}
								}
							} else {
								adapter.log.debug('Compare no val in old status ' + JSON.stringify(old));
							}
						}
					}
				} else {
					adapter.log.debug(
						'[Compare] ' +
							topic +
							' not processed ' +
							channel +
							'/' +
							origchannel +
							' state: ' +
							state +
							' value ' +
							val
					);
				}
			} else {
				adapter.log.debug(
					'[Compare] no stateDictObj for device ' +
						topic +
						' / ' +
						origchannel +
						'  -> ' +
						JSON.stringify(stateDictObj)
				);
			}
		} else {
			adapter.log.debug('[Compare] no stateDictObj ' + topic + ' -> ' + JSON.stringify(stateDictObj));
		}
	} catch (error) {
		adapter.log.debug('Compare went wrong ' + topic + ' / ' + channel + ' / ' + state + ' / ' + val + '->' + error);
		adapter.log.debug('Compare went wrong' + origchannel + stateDictObj[origchannel][state]);
	}

	return haUpdate;
}
async function storeSHELLYpayload(adapter, stateDictObj, stateObj, topic, payload, haenable, logged) {
	let haUpdate = [];
	if (payload) {
		try {
			let payloadobj = null;
			if (payload['data']) {
				if (payload['data']['quotaMap']) {
					let status = 'OK';
					if (status === 'OK') {
						payloadobj = payload['data']['quotaMap'];
					}
				}
			} else if (payload['params']) {
				payloadobj = payload['params'];
				let status = await adapter.getStateAsync(topic + '.info.status').catch((e) => {
					adapter.log.warn('did not get old value .info.status ->' + e);
				});
				if (status && status.val === 'offline') {
					await adapter.setStateAsync(topic + '.info.status', { val: 'online', ack: true });
					adapter.log.info('[EF] ' + topic + ' is online with cloud');
				}
			} else {
				adapter.log.debug('no params or data in Shelly payload ->' + JSON.stringify(payload));
			}

			if (payloadobj) {
				// adapter.log.debug('SHELLY got: ' + JSON.stringify(payloadobj));
				//stations with dotted syntax
				//shp1 as object structure
				for (const channel in payloadobj) {
					// adapter.log.debug(channel);
					let state, val;
					let haupd;
					switch (channel) {
						case 'cloud':
							state = channel + '_connected';
							val = payloadobj[channel]['connected'];
							haupd = await compareUpdate(
								adapter,
								stateDictObj,
								stateObj,
								haenable,
								topic,
								'communication',
								state,
								val,
								'communication',
								logged
							);
							if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
							state = channel + '_enabled';
							val = payloadobj[channel]['enabled'];
							haupd = await compareUpdate(
								adapter,
								stateDictObj,
								stateObj,
								haenable,
								topic,
								'communication',
								state,
								val,
								'communication',
								logged
							);
							if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
							break;
						case 'mqtt':
							state = channel + '_connected';
							val = payloadobj[channel]['connected'];
							haupd = await compareUpdate(
								adapter,
								stateDictObj,
								stateObj,
								haenable,
								topic,
								'communication',
								state,
								val,
								'communication',
								logged
							);
							if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
							break;
						case 'wifi_sta':
							state = channel + '_connected';
							val = payloadobj[channel]['connected'];
							haupd = await compareUpdate(
								adapter,
								stateDictObj,
								stateObj,
								haenable,
								topic,
								'communication',
								state,
								val,
								'communication',
								logged
							);
							if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
							break;
						case 'total_power':
							state = 'total_power';
							val = payloadobj[channel];
							haupd = await compareUpdate(
								adapter,
								stateDictObj,
								stateObj,
								haenable,
								topic,
								'emeters',
								state,
								val,
								'emeters',
								logged
							);
							if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
							break;
						case 'emeters':
							if (payloadobj[channel].length === 3) {
								for (let i = 0; i < payloadobj[channel].length; i++) {
									state = 'currentL' + (i + 1);
									val = payloadobj[channel][i]['current'];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
									state = 'voltageL' + (i + 1);
									val = payloadobj[channel][i]['voltage'];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
									state = 'powerL' + (i + 1);
									val = payloadobj[channel][i]['power'];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
									state = 'pfL' + (i + 1);
									val = payloadobj[channel][i]['pf'];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
									state = 'totalL' + (i + 1);
									val = payloadobj[channel][i]['total'];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
									state = 'total_returnedL' + (i + 1);
									val = payloadobj[channel][i]['total_returned'];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
								}
							} else {
								adapter.log.debug(channel + ' wrong length');
							}
							break;
						default:
							//nothing todo
							break;
					}
				}
			}
		} catch (error) {
			adapter.log.debug('store SHELLY JSON payload ' + error);
			adapter.log.debug('payload from ' + topic + ' was: ' + JSON.stringify(payload));
		}
	} else {
		adapter.log.debug('nothing to process');
	}
	return haUpdate;
}
async function storeSHPpayload(adapter, stateDictObj, stateObj, topic, payload, haenable, logged) {
	let haUpdate = [];
	if (payload) {
		try {
			let payloadobj = null;
			if (payload['data']) {
				if (payload['data']['quotaMap']) {
					let status = 'OK';
					if (status === 'OK') {
						payloadobj = payload['data']['quotaMap'];
					}
				}
			} else if (payload['params']) {
				payloadobj = payload['params'];
				//SHP cyclically receives params messages, so we can detect from here the online status ??
				let status = await adapter.getStateAsync(topic + '.info.status').catch((e) => {
					adapter.log.warn('did not get old value .info.status ->' + e);
				});
				if (status && status.val === 'offline') {
					await adapter.setStateAsync(topic + '.info.status', { val: 'online', ack: true });
					adapter.log.info('[EF] ' + topic + ' is online with cloud');
				}
			} else {
				adapter.log.debug('no params or data in SHP payload ->' + JSON.stringify(payload));
			}

			if (payloadobj) {
				// adapter.log.debug('SHP got: ' + JSON.stringify(payloadobj));
				//stations with dotted syntax
				//shp1 as object structure
				for (const channel in payloadobj) {
					// adapter.log.debug(channel);
					let state, val;
					let haupd;
					switch (channel) {
						case 'cfgSta':
							state = 'sta';
							val = payloadobj[channel]['sta'];
							haupd = await compareUpdate(
								adapter,
								stateDictObj,
								stateObj,
								haenable,
								topic,
								channel,
								state,
								val,
								channel,
								logged
							);
							if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
							break;
						case 'epsModeInfo':
							state = 'eps';
							val = payloadobj[channel]['eps'];
							haupd = await compareUpdate(
								adapter,
								stateDictObj,
								stateObj,
								haenable,
								topic,
								channel,
								state,
								val,
								channel,
								logged
							);
							if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
							break;
						case 'areaInfo':
							state = 'area';
							val = payloadobj[channel]['area'];
							haupd = await compareUpdate(
								adapter,
								stateDictObj,
								stateObj,
								haenable,
								topic,
								channel,
								state,
								val,
								channel,
								logged
							);
							if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
							break;
						case 'gridInfo':
							state = 'gridFreq';
							val = payloadobj[channel]['gridFreq'];
							haupd = await compareUpdate(
								adapter,
								stateDictObj,
								stateObj,
								haenable,
								topic,
								channel,
								state,
								val,
								channel,
								logged
							);
							if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
							state = 'gridVol';
							val = payloadobj[channel]['gridVol'];
							haupd = await compareUpdate(
								adapter,
								stateDictObj,
								stateObj,
								haenable,
								topic,
								channel,
								state,
								val,
								channel,
								logged
							);
							if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
							break;

						case 'emergencyStrategy':
							state = 'backupMode';
							val = payloadobj[channel]['backupMode'];
							haupd = await compareUpdate(
								adapter,
								stateDictObj,
								stateObj,
								haenable,
								topic,
								channel,
								state,
								val,
								channel,
								logged
							);
							if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
							state = 'isCfg';
							val = payloadobj[channel]['isCfg'];
							haupd = await compareUpdate(
								adapter,
								stateDictObj,
								stateObj,
								haenable,
								topic,
								channel,
								state,
								val,
								channel,
								logged
							);
							if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
							//chSta ggf. doppelt
							break;

						case 'backupChaDiscCfg':
							state = 'forceChargeHigh';
							val = payloadobj[channel]['forceChargeHigh'];
							haupd = await compareUpdate(
								adapter,
								stateDictObj,
								stateObj,
								haenable,
								topic,
								channel,
								state,
								val,
								channel,
								logged
							);
							if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
							state = 'discLower';
							val = payloadobj[channel]['discLower'];
							haupd = await compareUpdate(
								adapter,
								stateDictObj,
								stateObj,
								haenable,
								topic,
								channel,
								state,
								val,
								channel,
								logged
							);
							if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);

							break;
						case 'loadCmdChCtrlInfos':
							if (payloadobj[channel].length === 10) {
								for (let i = 0; i < payloadobj[channel].length; i++) {
									state = 'powCh_' + i;
									val = payloadobj[channel][i]['powCh'];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
									state = 'ctrlSta_' + i;
									val = payloadobj[channel][i]['ctrlSta'];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
									state = 'ctrlMode_' + i;
									val = payloadobj[channel][i]['ctrlMode'];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
									state = 'priority_' + i;
									val = payloadobj[channel][i]['priority'];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
								}
							} else {
								adapter.log.debug(channel + ' wrong length');
							}
							break;

						case 'splitPhaseInfo':
							if (payloadobj[channel]['cfgList'].length === 10) {
								for (let i = 0; i < payloadobj[channel]['cfgList'].length; i++) {
									state = 'linkMark_' + i;
									val = payloadobj[channel]['cfgList'][i]['linkMark'];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
									state = 'linkCh_' + i;
									val = payloadobj[channel]['cfgList'][i]['linkCh'];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
								}
							} else {
								adapter.log.debug(channel + ' wrong length');
							}
							break;
						case 'mainsLoadWatt':
							if (payloadobj[channel]['watth'].length === 10) {
								for (let i = 0; i < payloadobj[channel]['watth'].length; i++) {
									state = 'watthDaytoDate_' + i;
									val = payloadobj[channel]['watth'][i].reduce((a, b) => a + b, 0);
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
									state = 'watth_' + i;
									val = payloadobj[channel]['watth'][i];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
								}
							} else {
								adapter.log.debug(channel + ' wrong length');
							}
							break;

						case 'chUseInfo':
							if (payloadobj[channel]['isEnable'].length === 10) {
								for (let i = 0; i < payloadobj[channel]['isEnable'].length; i++) {
									state = 'isEnable_' + i;
									// the only one where true instead of 1
									val = payloadobj[channel]['isEnable'][i] === true ? 1 : 0;
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
								}
							} else {
								adapter.log.debug(channel + ' wrong length');
							}
							break;

						case 'loadChInfo':
							if (payloadobj[channel]['info'].length === 10) {
								for (let i = 0; i < payloadobj[channel]['info'].length; i++) {
									const xtract = Buffer.from(payloadobj[channel]['info'][i]['chName']);
									state = 'chName_' + i;
									val = xtract.toString();
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
								}
							} else {
								adapter.log.debug(channel + ' wrong length');
							}

							break;
						case 'backupCmdChCtrlInfos':
							if (payloadobj[channel].length === 2) {
								for (let i = 0; i < payloadobj[channel].length; i++) {
									state = 'powCh_' + (10 + i);
									val = payloadobj[channel][i]['powCh'];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);

									state = 'ctrlSta_' + (10 + i);
									val = payloadobj[channel][i]['ctrlSta'];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);

									state = 'ctrlMode_' + (10 + i);
									val = payloadobj[channel][i]['ctrlMode'];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);

									state = 'priority_' + (10 + i);
									val = payloadobj[channel][i]['priority'];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
								}
							} else {
								adapter.log.debug(channel + ' wrong length');
							}
							break;

						case 'topupLoadWatt':
							if (payloadobj[channel]['watth'].length === 2) {
								for (let i = 0; i < payloadobj[channel]['watth'].length; i++) {
									state = 'watthDaytoDate_' + (10 + i);
									val = payloadobj[channel]['watth'][i].reduce((a, b) => a + b, 0);
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
									state = 'watth_' + (10 + i);
									val = payloadobj[channel]['watth'][i];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
								}
							} else {
								adapter.log.debug(channel + ' wrong length');
							}
							break;

						case 'loadChCurInfo':
							if (payloadobj[channel]['cur'].length === 12) {
								for (let i = 0; i < payloadobj[channel]['cur'].length; i++) {
									state = 'cur_' + i;
									val = payloadobj[channel]['cur'][i];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
								}
							} else {
								adapter.log.debug(channel + ' wrong length');
							}
							break;
						case 'channelPower':
							if (payloadobj[channel]['infoList'].length === 12) {
								for (let i = 0; i < payloadobj[channel]['infoList'].length; i++) {
									state = 'powType_' + i;
									val = payloadobj[channel]['infoList'][i]['powType'];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
									state = 'chWatt_' + i;
									val = payloadobj[channel]['infoList'][i]['chWatt'];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
								}
							} else {
								adapter.log.debug(channel + ' wrong length');
							}
							break;

						case 'backupLoadWatt':
							if (payloadobj[channel]['watth'].length === 10) {
								for (let i = 0; i < payloadobj[channel]['watth'].length; i++) {
									state = 'watthDaytoDate_' + i;
									val = payloadobj[channel]['watth'][i].reduce((a, b) => a + b, 0);
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
									state = 'watth_' + i;
									val = payloadobj[channel]['watth'][i];
									haupd = await compareUpdate(
										adapter,
										stateDictObj,
										stateObj,
										haenable,
										topic,
										channel,
										state,
										val,
										channel,
										logged
									);
									if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
								}
							} else {
								adapter.log.debug(channel + ' wrong length');
							}
							break;
						case 'errorCodes':
							state = 'errorCodes';
							val = payloadobj[channel];
							haupd = await compareUpdate(
								adapter,
								stateDictObj,
								stateObj,
								haenable,
								topic,
								'heartbeat',
								state,
								val,
								'heartbeat',
								logged
							);
							if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
							break;
						case 'timeTask':
							//later
							break;
						case 'energyInfos':
							//later
							break;
						case 'id':
						case 'time':
						case 'cmdSet':
						case 'rtc':
						case 'index':
							//nothing todo
							break;
						default:
							//hier sollten nur noch die direkten Einzelwerte landen, die bei params drin sind
							// channel ist in dem Fall 'heartbeat"
							state = channel;
							val = payloadobj[channel];
							haupd = await compareUpdate(
								adapter,
								stateDictObj,
								stateObj,
								haenable,
								topic,
								'heartbeat',
								state,
								val,
								'heartbeat',
								logged
							);
							if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
							break;
					}
				}
			}
		} catch (error) {
			adapter.log.debug('store SHP JSON payload ' + error);
			adapter.log.debug('payload from ' + topic + ' was: ' + JSON.stringify(payload));
		}
	} else {
		adapter.log.debug('nothing to process');
	}
	return haUpdate;
}
async function storePowerkitPayload(adapter, stateDictObj, stateObj, topic, payload, haenable, logged) {
	let haUpdate = [];
	if (payload) {
		try {
			let payloadobj = null;
			if (payload['data']) {
				if (payload['data']['quotaMap']) {
					if (typeof payload['data']['quotaMap'] === 'string') {
						payloadobj = JSON.parse(payload['data']['quotaMap']);
					} else if (typeof payload['data']['quotaMap'] === 'object') {
						for (let obj in payload['data']['quotaMap']) {
							if (typeof payload['data']['quotaMap'][obj] === 'string') {
								payload['data']['quotaMap'][obj] = JSON.parse(payload['data']['quotaMap'][obj]);
							}
						}
						payloadobj = payload['data']['quotaMap'];
					}
					let status = await adapter.getStateAsync(topic + '.info.status').catch((e) => {
						adapter.log.warn('did not get old value .info.status ->' + e);
					});
					if (status && status.val === 'offline') {
						await adapter.setStateAsync(topic + '.info.status', { val: 'online', ack: true });
						adapter.log.info('[EF] ' + topic + ' is online with cloud');
					}
				}
			} else if (payload['params']) {
				if (typeof payload['params'] === 'string') {
					payloadobj = JSON.parse(payload['params']);
				} else if (typeof payload['params'] === 'object') {
					for (let obj in payload['params']) {
						if (typeof payload['params'][obj] === 'string') {
							payload['params'][obj] = JSON.parse(payload['params'][obj]);
						}
					}
					payloadobj = payload['params'];
				}
				let status = await adapter.getStateAsync(topic + '.info.status').catch((e) => {
					adapter.log.warn('did not get old value .info.status ->' + e);
				});
				if (status && status.val === 'offline') {
					await adapter.setStateAsync(topic + '.info.status', { val: 'online', ack: true });
					adapter.log.info('[EF] ' + topic + ' is online with cloud');
				}
			} else {
				adapter.log.debug('no params or data in Powerkit payload ->' + JSON.stringify(payload));
			}

			if (payloadobj) {
				//powerkit as object structure and additional modelSn before of data
				for (let channel in payloadobj) {
					//bmsTotal without serial
					if (channel === 'bmsTotal') {
						for (let obj in payloadobj[channel]) {
							let haupd;
							haupd = await compareUpdate(
								adapter,
								stateDictObj,
								stateObj,
								haenable,
								topic,
								channel,
								obj,
								payloadobj[channel][obj],
								channel,
								logged
							);
							if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
						}
					} else {
						for (let serial in payloadobj[channel]) {
							if (channel === 'bp2000' || channel === 'bp5000') {
								if (Object.prototype.hasOwnProperty.call(payloadobj[channel][serial], 'kitNum')) {
									await adapter.setStateAsync(
										topic + '.' + 'bp' + payloadobj[channel][serial]['kitNum'] + '.' + 'moduleSn',
										{
											val: serial,
											ack: true
										}
									);
								}
							} else if (channel === 'wireless' || channel === 'onLineModuleSnList') {
								//hier keine SN#
							} else {
								await adapter.setStateAsync(topic + '.' + channel + '.' + 'moduleSn', {
									val: serial,
									ack: true
								});
							}
							for (let obj in payloadobj[channel][serial]) {
								let haupd;
								let dbgmsgonce = null;
								switch (channel) {
									case 'bp2000':
									case 'bp5000':
										dbgmsgonce = false;
										if (
											Object.prototype.hasOwnProperty.call(payloadobj[channel][serial], 'kitNum')
										) {
											haupd = await compareUpdate(
												adapter,
												stateDictObj,
												stateObj,
												haenable,
												topic,
												'bp' + payloadobj[channel][serial]['kitNum'],
												obj,
												payloadobj[channel][serial][obj],
												'bp1',
												logged
											);
											if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										} else {
											if (dbgmsgonce === false) {
												adapter.log.warn('powerkit battery ' + serial + ' has no kitNum');
											}
											dbgmsgonce = true;
										}

										break;
									case 'onLineModuleSnList':
										// is array, so serial is a number 0....7(8,9)
										haupd = await compareUpdate(
											adapter,
											stateDictObj,
											stateObj,
											haenable,
											topic,
											channel,
											'm' + serial + '_' + obj,
											payloadobj[channel][serial][obj],
											channel,
											logged
										);
										if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										break;
									case 'ichigh':
										if (obj !== 'appCfg') {
											haupd = await compareUpdate(
												adapter,
												stateDictObj,
												stateObj,
												haenable,
												topic,
												channel,
												obj,
												payloadobj[channel][serial][obj],
												channel,
												logged
											);
											if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										} else {
											for (let key in payloadobj[channel][serial][obj]) {
												haupd = await compareUpdate(
													adapter,
													stateDictObj,
													stateObj,
													haenable,
													topic,
													channel,
													key,
													payloadobj[channel][serial][obj][key],
													channel,
													logged
												);
												if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
											}
										}

										break;
									default:
										haupd = await compareUpdate(
											adapter,
											stateDictObj,
											stateObj,
											haenable,
											topic,
											channel,
											obj,
											payloadobj[channel][serial][obj],
											channel,
											logged
										);
										if (Object.keys(haupd).length !== 0) haUpdate.push(haupd);
										break;
								}
							}
						}
					}
				}
			}
		} catch (error) {
			adapter.log.debug('store Powerkit JSON payload ' + error);
			adapter.log.debug('payload from ' + topic + ' was: ' + JSON.stringify(payload));
		}
	} else {
		adapter.log.debug('nothing to process');
	}
	return haUpdate;
}
/*
function getShpMode(ctrlSta, ctrlMode) {
	let mode = '';
	if (ctrlSta === 0 && ctrlMode === 0) {
		mode = 'Auto';
	} else if (ctrlSta === 0 && ctrlMode === 1) {
		mode = 'Grid';
	} else if (ctrlSta === 1 && ctrlMode === 1) {
		mode = 'Battery';
	} else if (ctrlSta === 2 && ctrlMode === 1) {
		mode = 'Off';
	} else {
		//no valid combination
	}
	return mode;
}
*/

function getIdFromTopic(topic, mqttUserId) {
	let msgtype;
	if (topic.includes('/app/device/property/')) {
		msgtype = 'update';
		topic = topic.replace('/app/device/property/', '');
	} else if (topic.includes('get_reply')) {
		msgtype = 'get_reply';
		topic = topic.replace('/app/' + mqttUserId + '/', '').replace('/thing/property/get_reply', '');
	} else if (topic.includes('get')) {
		msgtype = 'get';
		topic = topic.replace('/app/' + mqttUserId + '/', '').replace('/thing/property/get', '');
	} else if (topic.includes('set_reply')) {
		msgtype = 'set_reply';
		topic = topic.replace('/app/' + mqttUserId + '/', '').replace('/thing/property/set_reply', '');
	} else if (topic.includes('set')) {
		msgtype = 'set';
		topic = topic.replace('/app/' + mqttUserId + '/', '').replace('/thing/property/set', '');
	} else {
		msgtype = 'unknown msgtype';
	}
	return { msg: msgtype, topic: topic };
}

function createSubscribeTopics(userID, devices) {
	let topics = [];
	if (devices) {
		for (let key in devices) {
			topics.push('/app/' + userID + '/' + key + '/thing/property/set');
			topics.push('/app/' + userID + '/' + key + '/thing/property/set_reply');
			topics.push('/app/' + userID + '/' + key + '/thing/property/get');
			topics.push('/app/' + userID + '/' + key + '/thing/property/get_reply');
			topics.push('/app/device/property/' + key);
			//topics.push('/app/' + userID + '/' + key + '/status')
			//topics.push('/app/device/status+ '/' + key)
			//topics.push('/app/device/progress+ '/' + key)
			//topics.push('/app/+ userID + '/' + key + '/#)
		}
	}
	return topics;
}
async function getLastProtobufQuotas(adapter, pdevices) {
	try {
		for (const [ device, value ] of Object.entries(pdevices)) {
			const devtype = value['devType'];
			if (
				devtype === 'pstream600' ||
				devtype === 'pstream800' ||
				devtype === 'plug' ||
				devtype === 'deltaproultra'
			) {
				adapter.log.debug(device + ' -> latestQuotas request');
				const value = await adapter.getStateAsync(device + '.action.latestQuotas').catch((e) => {
					adapter.log.warn('did not get old value .action.latestQuotas ->' + e);
				});
				if (value) {
					await adapter.setStateAsync(
						device + '.action.latestQuotas',
						value.val === true ? false : true,
						false
					);
				} else {
					await adapter.setStateAsync(device + '.action.latestQuotas', true, false);
				}
			}
		}
	} catch (error) {
		adapter.log.debug('getLastProtobufQuotas -> ' + error);
	}
}

async function getLastJSONQuotas(adapter, pdevices) {
	try {
		for (const [ device, value ] of Object.entries(pdevices)) {
			const devtype = value['devType'];
			if (
				devtype !== 'pstream600' &&
				devtype !== 'pstream800' &&
				devtype !== 'plug' &&
				devtype !== 'deltaproultra'
			) {
				adapter.log.debug(device + ' -> latestQuotas request');
				const value = await adapter.getStateAsync(device + '.action.latestQuotas').catch((e) => {
					adapter.log.warn('did not get old value .action.latestQuotas ->' + e);
				});
				if (value) {
					await adapter.setStateAsync(
						device + '.action.latestQuotas',
						value.val === true ? false : true,
						false
					);
				} else {
					await adapter.setStateAsync(device + '.action.latestQuotas', true, false);
				}
			}
		}
	} catch (error) {
		adapter.log.debug('getLastJSONQuotas -> ' + error);
	}
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

function statesFromDict(allstates, dict) {
	let states = {};
	for (let channel in dict) {
		states[channel] = {};
		for (let key in dict[channel]) {
			const type = dict[channel][key]['entity'];
			if (!states[channel][type]) {
				states[channel][type] = {};
			}
			states[channel][type][key] = allstates[channel][type][key];
		}
	}
	return states;
}

async function prepareStationCmd(adapter, serial, stationType, state, value, cmd, channel, logged) {
	if (cmd) {
		if (Object.keys(cmd).length > 0) {
			//keine Zuschaltung von Verbrauchern, wenn die Kapazität unterhalb min
			//APP verhindert dies mit Meldung
			// hier generisch für alle stations
			if (
				(state === 'cfgAcEnabled' || state === 'carState' || state === 'dcOutState') &&
				(value === true || value == 1)
			) {
				//passt das für alle Powerstations?
				const min = await adapter.getStateAsync(serial + '.ems.minDsgSoc').catch((e) => {
					adapter.log.warn('did not get ' + serial + '.ems.minDsgSoc ->' + e);
				});
				const soc = await adapter.getStateAsync(serial + '.bmsMaster.f32ShowSoc').catch((e) => {
					adapter.log.warn('did not get ' + serial + '.bmsMaster.f32ShowSoc ->' + e);
				});
				try {
					if (soc.val < min.val) {
						adapter.log.warn(
							'soc ' +
								soc.val +
								' is below the minimum ' +
								min.val +
								', turning on is not allowed ' +
								state
						);
						return {};
					}
				} catch (error) {
					adapter.log.warn(
						'soc or  minDsgSoc have empty value due to missing initializing, gave error ' + error
					);
					return {};
				}
			}
			//hier Unterscheidung
			if (
				stationType === 'deltamax' ||
				stationType === 'deltapro' ||
				stationType === 'delta' ||
				stationType === 'deltamini' ||
				stationType === 'riverpro' ||
				stationType === 'rivermax'
			) {
				let msg = cmd.msg;
				// moduleTyp wird wohl nicht gebraucht
				//msg['moduleType'] = cmd['moduleType'] || 0;
				msg['id'] = String(getRandomInt(100000000, 900000000));
				//umrechnung der Werte
				switch (state) {
					case 'latestQuotas':
					case 'getAllTaskCfg':
						//no params to send
						break;
					case 'beepState':
						msg['params'][cmd['valName']] = value ? 0 : 1;
						break;
					case 'cfgAcEnabled':
					case 'cfgAcXboost':
					case 'carState':
					case 'dcOutState':
					case 'acautooutConfig':
					case 'chgPauseFlag':
						msg['params'][cmd['valName']] = value ? 1 : 0;
						break;
					case 'bppowerSoc':
						//const min = await adapter.getStateAsync(serial + '.ems.minDsgSoc');
						//msg['params']['minDsgSoc'] = min.val;
						//const max = await adapter.getStateAsync(serial + '.ems.maxChgSoc');
						//msg['params']['maxChgSoc'] = max.val;
						msg['params'][cmd['valName']] = value;
						break;
					case 'cfgDcChgCurrent':
						value = value * 1000;
						msg['params'][cmd['valName']] = value;
						break;
					default:
						// cfgChgType?? analog oder
						//all analog values
						msg['params'][cmd['valName']] = value;
						break;
				}
				if (logged) {
					adapter.log.debug(
						'prep cmd  ' +
							serial +
							'  ' +
							stationType +
							'  ' +
							state +
							'  ' +
							value +
							'  ' +
							JSON.stringify(msg)
					);
				}
				return msg;
			} else if (
				stationType === 'delta2' ||
				stationType === 'delta2max' ||
				stationType === 'river2pro' ||
				stationType === 'river2max' ||
				stationType === 'shelly3em'
			) {
				let msg = {
					from: 'Android',
					lang: 'en-us',
					id: String(getRandomInt(100000000, 900000000)),
					moduleType: 1,
					operateType: '',
					version: '1.0'
				};
				msg['params'] = cmd['params'];
				msg['moduleSn'] = serial;

				if (stationType === 'delta2max') {
					if (state === 'dcChgCurrent') {
						const curr = await adapter.getStateAsync(serial + '.mppt.pv2DcChgCurrent').catch((e) => {
							adapter.log.warn('did not get ' + serial + '.mppt.pv2DcChgCurrent ->' + e);
						});
						if (curr) {
							msg['params']['dcChgCfg2'] = curr.val * 1000;
						} else {
							//error ?
						}
					} else if (state === 'pv2DcChgCurrent') {
						const curr = await adapter.getStateAsync(serial + '.mppt.dcChgCurrent').catch((e) => {
							adapter.log.warn('did not get ' + serial + '.mppt.dcChgCurrent ->' + e);
						});
						if (curr) {
							msg['params']['dcChgCfg'] = curr.val * 1000;
						} else {
							// error
						}
					} else if (state === 'bpPowerSoc') {
						const min = await adapter.getStateAsync(serial + '.ems.minDsgSoc').catch((e) => {
							adapter.log.warn('did not get ' + serial + '.ems.minDsgSoc ->' + e);
						});
						//currently changing bpsoc enables the backup reserve
						if (min) {
							if (value < min.val + 5) {
								value = min.val + 5;
							} else msg['params']['minDsgSoc'] = value;
						} else {
							//error ?
						}
					} else if (state === 'watchIsConfig') {
						const bpsoc = await adapter.getStateAsync(serial + '.pd.bpPowerSoc').catch((e) => {
							adapter.log.warn('did not get ' + serial + '.pd.bpPowerSoc ->' + e);
						});
						if (bpsoc) {
							msg['params']['bpPowerSoc'] = bpsoc.val;
						} else {
							//error ?
						}
					}
				}

				switch (state) {
					case 'latestQuotas':
					case 'getAllTaskCfg':
						//no params to send
						break;
					case 'beepState':
						msg['params'][cmd['valName']] = value ? 0 : 1;
						break;
					//hier noch andere switches ergänzen
					case 'cfgAcEnabled':
					case 'cfgAcXboost':
					case 'carState':
					case 'dcOutState':
					case 'acAutoOnCfg':
					case 'newAcAutoOnCfg':
					case 'xboost':
					case 'pvChgPrioSet':
					case 'chgPauseFlag':
					case 'acAutoOutConfig':
						msg['params'][cmd['valName']] = value ? 1 : 0;
						break;
					case 'dcChgCurrent':
						//case 'cfgDcChgCurrent':
						break;
					case 'pv2DcChgCurrent':
						value = value * 1000;
						msg['params'][cmd['valName']] = value;
						break;
					case 'bppowerSoc':
						//const min = await adapter.getStateAsync(serial + '.ems.minDsgSoc');
						//msg['params']['minDsgSoc'] = min.val;
						//const max = await adapter.getStateAsync(serial + '.ems.maxChgSoc');
						//msg['params']['maxChgSoc'] = max.val;
						//if min max then in above code
						msg['params'][cmd['valName']] = value;
						break;
					case 'watchIsConfig':
						//const min = await adapter.getStateAsync(serial + '.ems.minDsgSoc');
						//msg['params']['minDsgSoc'] = min.val;
						//const max = await adapter.getStateAsync(serial + '.ems.maxChgSoc');
						//msg['params']['maxChgSoc'] = max.val;
						//if min max then in above code
						msg['params'][cmd['valName']] = value ? 1 : 0;
						break;
					default:
						msg['params'][cmd['valName']] = value;
						break;
				}
				msg['operateType'] = cmd['operateType'];
				msg['moduleType'] = cmd['moduleType'];
				if (logged) {
					adapter.log.debug(
						'prep cmd  ' +
							serial +
							'  ' +
							stationType +
							'  ' +
							state +
							'  ' +
							value +
							'  ' +
							JSON.stringify(msg)
					);
				}
				return msg;
			} else if (stationType === 'wave2') {
				let msg = {
					from: 'Android',
					lang: 'en-us',
					id: String(getRandomInt(100000000, 900000000)),
					moduleType: 1,
					operateType: '',
					version: '1.0'
				};
				msg['params'] = cmd['params'];
				msg['moduleSn'] = serial;

				// multivalue befehle
				// idleMode, idleTime
				// timeSet ?

				switch (state) {
					case 'idleMode':
					case 'tempSys':
					case 'tempDisplay':
					case 'beepEn':
						msg['params'][cmd['valName']] = value ? 1 : 0;
						break;
					case 'latestQuotas':
						//no params to send
						break;
					default:
						msg['params'][cmd['valName']] = value;
						break;
				}
				msg['operateType'] = cmd['operateType'];
				msg['moduleType'] = cmd['moduleType'];
				if (logged) {
					adapter.log.debug(
						'prep cmd  ' +
							serial +
							'  ' +
							stationType +
							'  ' +
							state +
							'  ' +
							value +
							'  ' +
							JSON.stringify(msg)
					);
				}
				return msg;
			} else if (stationType === 'glacier') {
				let msg = {
					from: 'Android',
					lang: 'en-us',
					id: String(getRandomInt(100000000, 900000000)),
					moduleType: 1,
					operateType: '',
					version: '1.0'
				};
				msg['params'] = cmd['params'];
				msg['moduleSn'] = serial;

				// multivalue befehle
				// pwrPbEn, powerPbLevel
				// iceMode, iceShape
				// tmpL/R/M
				switch (state) {
					case 'coolMode':
					case 'tmpUnit':
					case 'beepEn':
					case 'iceMode':
					case 'iceShape':
					case 'iceDetach':
					case 'sensorAdv':
					case 'pwrPbEn':
						msg['params'][cmd['valName']] = value ? 1 : 0;
						break;
					case 'dcChgCurrent':
						value = value * 1000;
						msg['params'][cmd['valName']] = value;
						break;
					case 'latestQuotas':
						//no params to send
						break;
					default:
						msg['params'][cmd['valName']] = value;
						break;
				}
				msg['operateType'] = cmd['operateType'];
				msg['moduleType'] = cmd['moduleType'];
				if (logged) {
					adapter.log.debug(
						'prep cmd  ' +
							serial +
							'  ' +
							stationType +
							'  ' +
							state +
							'  ' +
							value +
							'  ' +
							JSON.stringify(msg)
					);
				}
				return msg;
			} else if (stationType === 'panel') {
				let msg = {
					from: 'Android',
					lang: 'en-us',
					id: String(getRandomInt(100000000, 900000000)),
					moduleType: 0,
					operateType: 'TCP',
					version: '1.0'
				};
				msg['params'] = cmd['params'];
				msg['moduleType'] = cmd['moduleType'];
				//msg['moduleSn'] = serial;

				let secondval;
				let secondid = '';
				let path = '';
				//mode or ctrSta
				if (state.includes('ctrlSta_') || state.includes('ctrlMode_')) {
					const parts = state.split('_');
					const channel = parts[1];
					if (parts[0] === 'ctrlSta') {
						state = 'ctrlSta';
						//seconditem = 'ctrlMode';
						//secondid = 'ctrlMode'.concat('_', channel);
					} else if (parts[0] === 'ctrlMode') {
						state = 'ctrlMode';
						//seconditem = 'sta';
						//secondid = 'ctrlSta'.concat('_', channel);
					}
					if (channel < 10) {
						path = 'loadCmdChCtrlInfos';
					} else {
						path = 'backupCmdChCtrlInfos';
					}
				} else if (state === 'forceChargeHigh' || state === 'discLower') {
					path = 'backupChaDiscCfg';
					if (state === 'forceChargeHigh') {
						secondid = 'discLower';
					} else {
						secondid = 'forceChargeHigh';
					}
				}
				if (state === 'forceChargeHigh' || state === 'discLower') {
					// der Aufruf ist immer für secondid notwendig
					// eps braucht es nicht und würde zu Fehler bei Aufruf führen, da secondid =''
					//if statment für weitere Befehle erweitern!!!!
					const secvalue = await adapter.getStateAsync(serial + '.' + path + '.' + secondid).catch((e) => {
						adapter.log.warn('did not get ' + serial + '.' + path + '.' + secondid + '->' + e);
					});
					try {
						if (secvalue.val) {
							secondval = secvalue.val;
							adapter.log.debug('using ' + secondid + ' =  ' + secondval + 'as second value');
						} else {
							return {};
						}
					} catch (error) {
						adapter.log.warn(
							path + secondid + ' has empty value due to missing initializing, gave error ' + error
						);
						return {};
					}
				}

				switch (state) {
					case 'forceChargeHigh':
					case 'discLower':
						msg['params'][cmd['valName']] = value;
						//hier noch abfangen ob secondid und secondval vorhanden?
						//wahrscheinlich nicht, da es vorher schon beim vergeblichen Wertholen zu Fehler kommt
						msg['params'][secondid] = secondval;
						break;
					case 'eps':
						msg['params'][cmd['valName']] = value ? 1 : 0;
						break;
					case 'ctrlSta':
						msg['params'][cmd['valName']] = value;
						break;
					case 'ctrlMode':
						msg['params'][cmd['valName']] = value ? 1 : 0;
						break;
					default:
						//now actions
						//no value to be set
						break;
				}
				if (logged) {
					adapter.log.debug(
						'prep cmd  ' +
							serial +
							'  ' +
							stationType +
							'  ' +
							state +
							'  ' +
							value +
							'  ' +
							JSON.stringify(msg)
					);
				}
				return msg;
			} else if (
				stationType === 'powerkit' ||
				stationType === 'powerkitbp2000' ||
				stationType === 'powerkitbp5000'
			) {
				let msg = {
					from: 'Android',
					lang: 'en-us',
					id: String(getRandomInt(100000000, 900000000)),
					operateType: '',
					version: '1.0'
				};
				msg['sn'] = serial; // device sn#
				msg['params'] = cmd['params'];

				const moduleSn = await adapter.getStateAsync(serial + '.' + channel + '.' + 'mduleSn').catch((e) => {
					adapter.log.warn('did not get ' + serial + '.' + channel + '.' + 'moduleSn' + '->' + e);
				});

				switch (channel) {
					case 'bbcin':
						msg['moduleType'] = 15362;
						msg['moduleSn'] = moduleSn;
						break;
					case 'bbcout':
						msg['moduleType'] = 15363;
						msg['moduleSn'] = moduleSn;
						break;
					case 'bp1':
					case 'bp2':
					case 'bp3':
						msg['moduleType'] = 0;
						msg['moduleSn'] = '0000000000000000';
						break;
					case 'iclow':
						msg['moduleType'] = 15365;
						msg['moduleSn'] = moduleSn;
						break;
					case 'ldac':
						msg['moduleType'] = 15367;
						msg['moduleSn'] = moduleSn;
						break;
					case 'lddc':
						msg['moduleType'] = 15368;
						msg['moduleSn'] = moduleSn;
						break;
					case 'wireless':
						msg['moduleType'] = 15370;
						msg['moduleSn'] = moduleSn;
						break;
					default:
						break;
				}

				switch (state) {
					case 'latestQuotas':
						msg['operateType'] = cmd['operateType'];
						//no params to send
						break;
					default:
						//msg['params'][cmd['valName']] = value;
						break;
				}
				//msg['operateType'] = cmd['operateType'];
				if (logged) {
					adapter.log.debug(
						'prep cmd  ' +
							serial +
							'  ' +
							stationType +
							'  ' +
							state +
							'  ' +
							value +
							'  ' +
							JSON.stringify(msg)
					);
				}
				return msg;
			}
		} else {
			adapter.log.warn('no cmd prepared for this control ' + state);
			return {};
		}
	} else {
		adapter.log.warn('no cmd object provided ->' + JSON.stringify(cmd));
		return {};
	}
}
async function prepareStreamCmd(adapter, serial, streamType, state, value, cmd, log) {
	if (state === 'latestQuotas') {
		if (log === true) {
			adapter.log.debug('preparaing latestQuotas: ' + serial);
		}
		let muster = {
			header: {
				src: 32,
				dest: 32,
				seq: Date.now(),
				from: 'ios'
			}
		};
		const root = protobuf.parse(protoSource).root;
		const SetMessage = root.lookupType('setMessage');
		const message = SetMessage.create(muster);
		const messageBuffer = SetMessage.encode(message).finish();
		return messageBuffer;
	} else {
		if (streamType === 'pstream600' || streamType === 'pstream800') {
			let muster = {
				header: {
					src: 32,
					dest: 53,
					dSrc: 1,
					dDest: 1,
					checkType: 3,
					cmdFunc: 20,
					cmdId: 129,
					needAck: 1,
					seq: Date.now(),
					version: 19,
					payloadVer: 1,
					from: 'ios',
					deviceSn: serial
				}
			};
			if (state === 'supplyPriority' || state === 'feedPriority') {
				if (value === true) {
					muster['header']['pdata'] = {};
					muster['header']['pdata']['value'] = value ? 1 : 0;
					//muster['header']['dataLen'] = {};
					muster['header']['dataLen'] = cmd['msg']['dataLen'] || 2;
				} else {
					//omit pdata
					// the APP sends no value for padata respectively the item #1
				}
			} else if (state === 'permanentWatts' || state === 'invBrightness') {
				if (value !== 0) {
					muster['header']['pdata'] = {};
					muster['header']['pdata']['value'] = parseInt(String(value * 10));
					//muster['header']['dataLen'] = {};
					if (parseInt(String(value * 10)) > 128) {
						muster['header']['dataLen'] = 3;
					} else {
						muster['header']['dataLen'] = 2;
					}
					//muster['header']['dataLen'] = cmd['msg']['dataLen'] || 3;
					//muster['header']['dataLen'] = cmd['msg']['dataLen'] || 2;
				} else {
					//omit pdata
					// the APP sends no value for padata respectively the item #1
				}
			} else if (state === 'ratedPower') {
				if (value !== 0) {
					muster['header']['pdata'] = {};
					muster['header']['pdata']['value'] = parseInt(String(value));
					//muster['header']['dataLen'] = {};
					if (parseInt(String(value * 10)) > 128) {
						muster['header']['dataLen'] = 3;
					} else {
						muster['header']['dataLen'] = 2;
					}
					//muster['header']['dataLen'] = cmd['msg']['dataLen'] || 3;
					//muster['header']['dataLen'] = cmd['msg']['dataLen'] || 2;
				} else {
					//omit pdata
					// the APP sends no value for padata respectively the item #1
				}
			} else if (state === 'lowerLimit' || state === 'upperLimit') {
				if (value !== 0) {
					muster['header']['pdata'] = {};
					muster['header']['pdata']['value'] = value;
					//muster['header']['dataLen'] = {};
					muster['header']['dataLen'] = cmd['msg']['dataLen'] || 2;
				} else {
					//omit pdata
					// the APP sends no value for padata
				}
			} else {
				//mostly for the previous omitted ones
				muster['header']['pdata'] = {};
				muster['header']['pdata']['value'] = value;
				muster['header']['dataLen'] = {};
			}
			muster['header']['cmdFunc'] = cmd['msg']['cmdFunc'];
			muster['header']['cmdId'] = cmd['msg']['cmdId'];
			if (log) {
				adapter.log.debug(
					'[PROTOBUF encode] ' + state + ' ' + value + ' send stream ' + JSON.stringify(muster)
				);
			}
			// reconnect prepareStreamCmd(adapter, serial, streamType, '', 17477,{msg: {cmdFunc: 32, cmdId: 11, dataLen: 4 }})

			const root = protobuf.parse(protoSource).root;
			const SetMessage = root.lookupType('setMessage');
			const message = SetMessage.create(muster);
			const messageBuffer = SetMessage.encode(message).finish();
			return messageBuffer;
		} else if (streamType === 'plug') {
			let muster = {
				header: {
					src: 32,
					dest: 53,
					dSrc: 1,
					dDest: 1,
					checkType: 3,
					cmdFunc: 2,
					cmdId: 129,
					needAck: 1,
					seq: Date.now(),
					version: 19,
					payloadVer: 1,
					from: 'ios',
					deviceSn: serial
				}
			};
			if (state === 'switch' || state === 'meshEnable' || state === 'dynWattEnable') {
				if (value === true) {
					muster['header']['pdata'] = {};
					muster['header']['pdata']['value'] = value ? 1 : 0;
					//muster['header']['dataLen'] = {};
					muster['header']['dataLen'] = cmd['msg']['dataLen'] || 2;
				} else {
					//omit pdata
					// the APP sends no value for padata respectively the item #1
				}
			} else if (state === 'maxWatts') {
				muster['header']['pdata'] = {};
				muster['header']['pdata']['value'] = parseInt(value);
				//muster['header']['dataLen'] = {};
				muster['header']['dataLen'] = cmd['msg']['dataLen'] || 3;
			} else if (state === 'brightness') {
				if (value !== 0) {
					muster['header']['pdata'] = {};
					muster['header']['pdata']['value'] = parseInt(String(value / 100 * 1023));
					//muster['header']['dataLen'] = {};
					if (parseInt(String(value / 100 * 1023)) > 128) {
						muster['header']['dataLen'] = 3;
					} else {
						muster['header']['dataLen'] = 2;
					}
					//muster['header']['dataLen'] = cmd['msg']['dataLen'] || 3;
				} else {
					//omit pdata
					// the APP sends no value for padata respectively the item #1
				}
			} else {
				muster['header']['pdata'] = {};
				muster['header']['pdata']['value'] = value;
				muster['header']['dataLen'] = {};
			}
			//for all commands
			muster['header']['cmdFunc'] = cmd['msg']['cmdFunc'];
			muster['header']['cmdId'] = cmd['msg']['cmdId'];

			if (log) {
				adapter.log.debug('[PROTOBUF encode] ' + state + ' ' + value + ' send plug ' + JSON.stringify(muster));
			}
			// reconnect prepareStreamCmd(adapter, serial, streamType, '', 17477,{msg: {cmdFunc: 32, cmdId: 11, dataLen: 4 }})

			const root = protobuf.parse(protoSource).root;
			const SetMessage = root.lookupType('setMessage');
			const message = SetMessage.create(muster);
			const messageBuffer = SetMessage.encode(message).finish();
			return messageBuffer;
		} else if (streamType === 'deltaproultra') {
			let muster = {
				header: {
					src: 32,
					dest: 2,
					dSrc: 1,
					dDest: 1,
					checkType: 3,
					cmdFunc: 2,
					cmdId: 129,
					needAck: 1,
					seq: Date.now(),
					version: 19,
					payloadVer: 1,
					from: 'ios'
				}
			};
			if (state === 'wireless_4gOn') {
				if (value === true) {
					muster['header']['pdata'] = {};
					muster['header']['pdata']['value'] = value ? 1 : 0;
					//muster['header']['dataLen'] = {};
					muster['header']['dataLen'] = cmd['msg']['dataLen'] || 2;
					muster['header']['dest'] = cmd['msg']['dest'] || 53;
				} else {
					//omit pdata
					// the APP sends no value for padata respectively the item #1
				}
			} else if (state === 'energyManageEnable') {
				//enable sends true +limit
				//disable sends only limit
				//minDsgSoc changes also limit (+5%)
				const minsoc = await adapter.getStateAsync(serial + '.AppParaHeartbeatReport.dsgMinSoc').catch((e) => {
					adapter.log.warn('did not get ' + serial + '.AppParaHeartbeatReport.dsgMinSoc ->' + e);
				});
				const bpsoc = await adapter.getStateAsync(serial + '.AppParaHeartbeatReport.backupRatio').catch((e) => {
					adapter.log.warn('did not get ' + serial + '.AppParaHeartbeatReport.backupRatio ->' + e);
				});
				if (value === true) {
					muster['header']['pdata'] = {};
					muster['header']['pdata']['value'] = value ? 1 : 0;
					if (bpsoc.val < minsoc.val + 5) {
						muster['header']['pdata']['value2'] = minsoc.val + 5;
					} else {
						muster['header']['pdata']['value2'] = bpsoc.val;
					}
					//muster['header']['dataLen'] = {};
					muster['header']['dataLen'] = cmd['msg']['dataLen'] || 4;
				} else {
					//omit pdata value#1
					// the APP sends no value for padata respectively the item #1
					muster['header']['pdata'] = {};
					muster['header']['pdata']['value2'] = bpsoc.val;
					//muster['header']['dataLen'] = {};
					muster['header']['dataLen'] = 2; //always 2
				}
			} else if (state === 'chgMaxSoc' || state === 'dsgMinSoc' || state === 'chg_5p8SetWatts') {
				if (value !== 0) {
					muster['header']['pdata'] = {};
					muster['header']['pdata']['value'] = parseInt(value);
					//muster['header']['dataLen'] = {};
					if (value > 128) {
						muster['header']['dataLen'] = 3;
					} else {
						muster['header']['dataLen'] = 2;
					}
					//muster['header']['dataLen'] = cmd['msg']['dataLen'] || 3;
				} else {
					//omit pdata
					// the APP sends no value for padata respectively the item #1
				}
			} else if (state === 'chgC20SetWatts') {
				if (value !== 0) {
					muster['header']['pdata'] = {};
					muster['header']['pdata']['value2'] = parseInt(value); // must be field 2
					//muster['header']['dataLen'] = {};
					muster['header']['dataLen'] = 3;
				} else {
					//omit pdata
					// the APP sends no value for padata respectively the item #1
				}
			} else if (
				state === 'powerStandbyMins' ||
				state === 'screenStandbySec' ||
				state === 'dcStandbyMins' ||
				state === 'acStandbyMins'
			) {
				//selects
				//manipulate value?
				if (value !== 0) {
					muster['header']['pdata'] = {};
					muster['header']['pdata']['value'] = parseInt(value);
					//muster['header']['dataLen'] = {};
					if (value > 128) {
						muster['header']['dataLen'] = 3;
					} else {
						muster['header']['dataLen'] = 2;
					}
				} else {
					//omit pdata
					// the APP sends no value for padata respectively the item #1
				}
			} else {
				muster['header']['pdata'] = {};
				muster['header']['pdata']['value'] = value;
				muster['header']['dataLen'] = 2;
			}
			//for all commands
			muster['header']['cmdFunc'] = cmd['msg']['cmdFunc'];
			muster['header']['cmdId'] = cmd['msg']['cmdId'];
			if (log) {
				adapter.log.debug(
					'[PROTOBUF encode] ' + state + ' ' + value + ' send deltaproultra ' + JSON.stringify(muster)
				);
			}
			const root = protobuf.parse(protoSource).root;
			const SetMessage = root.lookupType('setMessage');
			const message = SetMessage.create(muster);
			const messageBuffer = SetMessage.encode(message).finish();
			return messageBuffer;
		} else if (streamType === 'powerocean') {
			let muster = {
				header: {
					src: 32,
					dest: 53,
					dSrc: 1,
					dDest: 1,
					checkType: 3,
					cmdFunc: 2,
					cmdId: 129,
					needAck: 1,
					seq: Date.now(),
					version: 19,
					payloadVer: 1,
					from: 'ios',
					deviceSn: serial
				}
			};
			//for all commands
			muster['header']['cmdFunc'] = cmd['msg']['cmdFunc'];
			muster['header']['cmdId'] = cmd['msg']['cmdId'];
			if (log) {
				adapter.log.debug(
					'[PROTOBUF encode] ' + state + ' ' + value + ' send powerocean ' + JSON.stringify(muster)
				);
			}
			const root = protobuf.parse(protoSource).root;
			const SetMessage = root.lookupType('setMessage');
			const message = SetMessage.create(muster);
			const messageBuffer = SetMessage.encode(message).finish();
			return messageBuffer;
		} else {
			adapter.log.debug('nothing to do ' + streamType);
		}
	}
}

async function getEcoFlowMqttCredits(adapter, email, password) {
	let mqttDaten = {
		UserID: '',
		User: '',
		URL: '',
		Port: '',
		protocol: '',
		clientID: ''
	};
	const options = {
		hostname: 'api.ecoflow.com',
		path: '/auth/login',
		method: 'POST',
		headers: {
			Host: 'api.ecoflow.com',
			lang: 'de-de',
			platform: 'android',
			sysversion: '11',
			version: '4.1.2.02',
			phonemodel: 'SM-X200',
			'content-type': 'application/json',
			'user-agent': 'okhttp/3.14.9'
		}
	};
	const data = {
		appVersion: '4.1.2.02',
		email: email,
		os: 'android',
		osVersion: '30',
		password: Buffer.from(password).toString('base64'),
		scene: 'IOT_APP',
		userType: 'ECOFLOW'
	};
	function httpsRequest(options, data) {
		return new Promise((resolve, reject) => {
			const req = https.request(options, (res) => {
				let data = '';
				res.on('data', (chunk) => {
					data += chunk;
				});
				res.on('end', () => {
					resolve(data);
				});
			});
			req.on('error', (error) => {
				reject(error);
			});

			if (data) {
				req.write(JSON.stringify(data));
			}
			req.end();
		});
	}

	function uuidv4() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (Math.random() * 16) | 0,
				v = c === 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}
	let token;
	let userid;
	let response;
	try {
		response = await httpsRequest(options, data);
		adapter.log.debug(response);
		token = JSON.parse(response).data.token;
		userid = JSON.parse(response).data.user.userId;
	} catch (error) {
		adapter.log.debug(error); //
		throw new Error(
			'Ein Fehler bei der Ermittlung der Zugangsdaten ist aufgetreten. Bitte prüfe die Zugangsdaten.'
		);
	}

	options.path = `/iot-auth/app/certification?userId=${userid}`;
	options.method = 'GET';
	options.headers.authorization = `Bearer ${token}`;

	try {
		response = await httpsRequest(options);
		adapter.log.debug(response);
		mqttDaten.Password = JSON.parse(response).data.certificatePassword;
		mqttDaten.Port = JSON.parse(response).data.port;
		mqttDaten.UserID = userid;
		mqttDaten.User = JSON.parse(response).data.certificateAccount;
		mqttDaten.URL = JSON.parse(response).data.url;
		mqttDaten.protocol = JSON.parse(response).data.protocol;
		mqttDaten.clientID = 'ANDROID_' + uuidv4() + '_' + userid;
	} catch (error) {
		adapter.log.debug(error);
		throw new Error(
			'Ein Fehler bei der Ermittlung der Zugangsdaten ist aufgetreten. Bitte prüfe die Zugangsdaten.'
		);
	}
	return mqttDaten;
}

exports.pstreamDecode = pstreamDecode;
exports.storeStationPayload = storeStationPayload;
exports.storeStreamPayload = storeStreamPayload;
exports.storeSHELLYpayload = storeSHELLYpayload;
exports.storeSHPpayload = storeSHPpayload;
exports.storePowerkitPayload = storePowerkitPayload;
exports.createSubscribeTopics = createSubscribeTopics;
exports.getEcoFlowMqttCredits = getEcoFlowMqttCredits;
exports.prepareStreamCmd = prepareStreamCmd;
exports.prepareStationCmd = prepareStationCmd;
exports.statesFromDict = statesFromDict;
exports.getLastProtobufQuotas = getLastProtobufQuotas;
exports.getLastJSONQuotas = getLastJSONQuotas;
exports.getIdFromTopic = getIdFromTopic;
