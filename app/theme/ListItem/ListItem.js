import React,{Component, PropTypes} from 'react';
import {
  Alert,
  Text ,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import {Avatar,Session,Button} from "../index"
import styles from "./ListItem_Style.js"
import { Actions } from 'react-native-router-flux';
import * as Constants from "../../Components/commonConstant"

class ListItem extends Component {

  constructor(props){
    super(props)
    this.state = {
      isShow:false,
    }
  }

  static propTypes = {
    cancelContract: PropTypes.func.isRequired,

  };

  static defaultProps = {
    // customStyle: {},
  };

  onFeedback(){
    Alert.alert('Coming soon');
  }
  onMessage(){
    if(this.props.data.fake) return Alert.alert('It\'s fake data');
    Actions.ChatForm({ userName: this.props.data.name });
  }
  onRefund(){
    Alert.alert('Coming soon');
  }
  onReschedule(){
    if(this.props.data.fake) return Alert.alert('It\'s fake data');
    Alert.alert('Coming soon');
  }
  onCancel(){
    if(this.props.data.fake) return Alert.alert('It\'s fake data');
    if(this.props.role === Constants.user_client) return Alert.alert('You aren\'t pros');
    this.props.cancelContract(this.props.data.contractId);
  }

  render(){
    const {data} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.content} onPress={()=>this.setState({isShow:!this.state.isShow})}>
          <View style={{flexDirection:"row",flex:1,alignItems:"center"}}>
            <View style={{flexDirection:"row",alignItems:"center",flex:0.5}}>
              <Avatar type={data.type} backgroundColor={data.backgroundColor} text={data.text} source={data.image}/>
              <Text style={styles.name}>{data.name}</Text>
            </View>
            <View style={{marginLeft:5,flex:0.5}}>
              <Text style={styles.time}>{data.time}</Text>
            </View>
          </View>
          <Session style={{marginLeft:5}} progress={data.progress} total={data.total}/>
        </TouchableOpacity>
        {this.state.isShow && data.progress!==data.total && <View style={styles.hiddenContainer}>
            <Button type="image_text" source={require("../../Assets/images/icon/ic_message.png")} text="Message" onPress={()=>{this.onMessage()}}/>
            <Button type="image_text" source={require("../../Assets/images/icon/ic_cancel.png")} text="Cancel" onPress={()=>{this.onCancel()}}/>
            <Button type="image_text" source={require("../../Assets/images/icon/ic_reschedule.png")} text="Reschedule" onPress={()=>{this.onReschedule()}}/>
            <Button type="image_text" source={require("../../Assets/images/icon/ic_refund.png")} text="Refund" onPress={()=>{this.onRefund()}}/>
          </View>}
          {this.state.isShow && data.progress===data.total && <View style={styles.hiddenContainer}>
              <Button type="image_text" source={require("../../Assets/images/icon/ic_feedback@2x.png")} text="Send your Feedback" onPress={()=>{this.onFeedback()}}/>
            </View>}
          {this.state.isShow && <Image source={require("../../Assets/images/icon/ic_up_arrow@2x.png")} style={styles.icArrow}/>}
      </View>
    )
  }
}

export default ListItem;
