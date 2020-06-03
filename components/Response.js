import React, {Component} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native'
import {Icon} from 'react-native-elements'
import * as Animatable from 'react-native-animatable'

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
            this.setState({show:true});
            switch(this.props.action.name){
                case "formError":
                    this.setState({msg: "Field must not be null !"});
                case "postTable" :
                    this.setState({msg: "Add table successful !"});
                default:
                    break;
            }
        }
    }
    render(){
        return(
            <View style={styles.container}>
                {this.state.show &&
                    <Animatable.View style={styles.animation} animation='fadeIn' direction='alternate'
                            iterationCount={2} duration={1000} onAnimationEnd={()=> this.setState({show:false})}> 
                             <Text style={styles.text}>{this.state.msg}</Text>
                             <Icon reverse type='font-awesome' name='check-circle-o' color='gold' size={10} containerStyle={{marginLeft:-10}}/>
                    </Animatable.View>
                }
                 
            </View>
            
        )
    }
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width:150,
        height: 50,
        bottom:100,
        right:200
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
        fontSize:11
    }
})