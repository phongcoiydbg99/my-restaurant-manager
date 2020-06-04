import React, {Component} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Modal,
  Dimensions,
} from "react-native";
import {Icon} from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
const { width: WIDTH } = Dimensions.get("window");
const { width: HEIGHT } = Dimensions.get("window");
//response nay la notify tra ve khi thuc hien xong add, modify hay delete
export default class Response extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
            msg:""
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.action !== this.props.action){
            let act=this.props.action;
            switch(act.name){
                case 'formError':
                    this.setState({msg: "Field must not be null !", show: true});
                    break;
                case 'postTable' : case 'putTable': case 'deleteTable':
                    this.setState({msg: act.msg, show: true});
                    break;
                
                default:
                    break;
            }
            
        }
    }
    render(){
        return(
            
                <Modal visible={this.state.show} transparent={true}>
                    <View style={styles.modalView}>
                    <Animatable.View style={styles.animation} animation='fadeIn' direction='alternate'
                            iterationCount={2} duration={1500} onAnimationEnd={()=> this.setState({show:false})}> 
                             <Text style={styles.text}>{this.state.msg}</Text>
                             <Icon reverse type='font-awesome' name='check-circle-o' color='gold' size={10} />
                    </Animatable.View>
                    </View>
                </Modal>
            
            
        )
    }
}
const styles = StyleSheet.create({
    modalView: {
        position: 'absolute',
        width:250,
        height: 50,
        top:120,
        right:(WIDTH-250)/2,
        borderRadius:10
    },
    animation:{
        height:'100%',
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'gray',
        borderRadius:10
    },
    text:{
        fontSize:15,
        marginLeft:10,
        color: "#fff",
    }
})