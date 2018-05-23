/**
 * 初始化字典(Items)模拟数据
 *
 * Created by handy on 2018/5/21.
 */
const Mock = require('mockjs');

const Items = [];

// 报警类型 SensorType
Items.push({"F_Id" : 56, "F_ItemCode" : 1, "F_Type" : "AlarmType", "F_ItemName" : "主机报警" });
Items.push({"F_Id" : 57, "F_ItemCode" : 3, "F_Type" : "AlarmType", "F_ItemName" : "传感器报警" });
Items.push({"F_Id" : 58, "F_ItemCode" : 2, "F_Type" : "AlarmType", "F_ItemName" : "主机推送" });
Items.push({"F_Id" : 59, "F_ItemCode" : 4, "F_Type" : "AlarmType", "F_ItemName" : "传感器推送" });

// 传感器类型
Items.push({"F_Id" : 60, "F_ItemCode": "1", "F_Type" : "SensorType" "F_ItemName" : "门磁"});
Items.push({"F_Id" : 61, "F_ItemCode": "2", "F_Type" : "SensorType" "F_ItemName" : "玻璃破碎检测"});
Items.push({"F_Id" : 62, "F_ItemCode": "3", "F_Type" : "SensorType" "F_ItemName" : "煤气检测"});
Items.push({"F_Id" : 63, "F_ItemCode": "4", "F_Type" : "SensorType" "F_ItemName" : "烟雾检测"});
Items.push({"F_Id" : 64, "F_ItemCode": "5", "F_Type" : "SensorType" "F_ItemName" : "SOS 按键"});
Items.push({"F_Id" : 65, "F_ItemCode": "6", "F_Type" : "SensorType" "F_ItemName" : "震动检测"});
Items.push({"F_Id" : 66, "F_ItemCode": "7", "F_Type" : "SensorType" "F_ItemName" : "漏水检测"});
Items.push({"F_Id" : 67, "F_ItemCode": "8", "F_Type" : "SensorType" "F_ItemName" : "红外探测"});
Items.push({"F_Id" : 68, "F_ItemCode": "9", "F_Type" : "SensorType" "F_ItemName" : "红外对射"});
Items.push({"F_Id" : 69, "F_ItemCode": "10", "F_Type" : "SensorType" "F_ItemName" : "遥控器"});
Items.push({"F_Id" : 70, "F_ItemCode": "11", "F_Type" : "SensorType" "F_ItemName" : "射频卡"});
Items.push({"F_Id" : 71, "F_ItemCode": "12", "F_Type" : "SensorType" "F_ItemName" : "门铃"});
Items.push({"F_Id" : 72, "F_ItemCode": "13", "F_Type" : "SensorType" "F_ItemName" : "D按键"});
Items.push({"F_Id" : 73, "F_ItemCode": "14", "F_Type" : "SensorType" "F_ItemName" : "急救手表"});
Items.push({"F_Id" : 74, "F_ItemCode": "15", "F_Type" : "SensorType" "F_ItemName" : "指纹锁"});

module.exports = Items;
