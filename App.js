import React from 'react';
import {StyleSheet,View,TouchableOpacity,Alert,Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      gameState:  [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPLayer: 1,
    }
  }
  componentDidMount(){
    this.initializeGame();
  }
  initializeGame = () => {
     this.setState({gameState:
       [
         [0 ,0 ,0],
         [0, 0, 0],
         [0, 0, 0]
       ],
       currentPLayer: 1,
     });
  }
  // Agar player 1 jeete to "1" return kary, player 2 jeete to "-1", agar koi na jeety to zero..
  Winner = () => {
    const NUM_TILES = 3;
    var arr = this.state.gameState;
    var sum;
  // Pehle Rows check kary gy..
  for (var i = 0; i < NUM_TILES; i++){
    sum = arr[i][0] + arr[i][1] + arr[i][2];
    if(sum == 3){return 1;}
    else if(sum == -3){return -1;}
  }
  // Ab Column check kary gy..
  for (var i = 0; i < NUM_TILES; i++){
    sum = arr[0][i] + arr[1][i] + arr[2][i];
    if(sum == 3){return 1;}
    else if(sum == -3){return -1;}
  }
  // ab Diagnol me check kary gy..
  sum = arr[0][0] + arr[1][1] + arr[2][2];
  if(sum == 3){return 1;}
  else if(sum == -3){return -1;}

  sum = arr[2][0] + arr[1][1] + arr[0][2];
  if(sum == 3){return 1;}
  else if(sum == -3){return -1;}
// Agar koi winner na ho to..
return 0;


}
  
  onTilePress = (row , col) => {
    // Sign change na hone k liye..
    var value = this.state.gameState[row][col];
    if (value !== 0){return;} 
  // Current player ko pakarne k liye..
var currentPLayer = this.state.currentPLayer;
//Check Karne k liye k sab "x"pe click ho rahe..
var arr = this.state.gameState.slice();
arr[row][col] = currentPLayer;
this.setState({gameState: arr});
//Dosre player pe switch hone k liye..
var nextPlayer = (currentPLayer==1)? -1 : 1;
this.setState({currentPLayer: nextPlayer});

// winner check karne k liye..
var win = this.Winner();
if (win == 1){
  Alert.alert("Player 1 is the winner");
  this.initializeGame();
}
else if (win == -1){
  Alert.alert("Player 2 is the winner");
  this.initializeGame();
}

}
//Game agar draw ho to refresh karne k liye
onNewGamePress = () => {
  this.initializeGame();
}
  renderIcon = (row , col) => {
    var value = this.state.gameState[row][col];
    switch (value) 
    {
      case 1: return<Icon name="close" style = {styles.tileX} />;
      case -1: return<Icon name="check" style = {styles.tileY} />;
      default: return <View />;
    }
  }
  
  render() {
  return (
      <View style={styles.container}>

      <View style = {{flexDirection: "row"}}>
          <TouchableOpacity onPress = {() => this.onTilePress(0,0)} style = {[styles.title, {borderLeftWidth: 0, borderTopWidth: 0, }]}>
             {this.renderIcon(0,0)}
            </TouchableOpacity>
          <TouchableOpacity  onPress = {() => this.onTilePress(0,1)} style = {[styles.title, {borderTopWidth: 0, }]}>
          {this.renderIcon(0,1)}
            </TouchableOpacity>
          <TouchableOpacity  onPress = {() => this.onTilePress(0,2)} style = {[styles.title, {borderRightWidth: 0, borderTopWidth: 0, }]}>
          {this.renderIcon(0,2)}
            </TouchableOpacity>
        </View>
        <View style = {{flexDirection: "row"}}>
          <TouchableOpacity  onPress = {() => this.onTilePress(1,0)} style = {[styles.title, {borderLeftWidth: 0, }]}>
          {this.renderIcon(1,0)}
            </TouchableOpacity>
          <TouchableOpacity  onPress = {() => this.onTilePress(1,1)} style = {[styles.title, { }]}>
          {this.renderIcon(1,1)}
            </TouchableOpacity>
          <TouchableOpacity  onPress = {() => this.onTilePress(1,2)} style = {[styles.title, {borderRightWidth: 0, }]}>
          {this.renderIcon(1,2)}
            </TouchableOpacity>
        </View>
        <View style = {{flexDirection: "row"}}>
          <TouchableOpacity  onPress = {() => this.onTilePress(2,0)} style = {[styles.title, {borderBottomWidth: 0, borderLeftWidth: 0,}]}>
          {this.renderIcon(2,0)}
            </TouchableOpacity>
          <TouchableOpacity  onPress = {() => this.onTilePress(2,1)} style = {[styles.title, {borderBottomWidth: 0,}]}>
          {this.renderIcon(2,1)}
            </TouchableOpacity>
          <TouchableOpacity  onPress = {() => this.onTilePress(2,2)} style = {[styles.title, {borderBottomWidth: 0,borderRightWidth: 0, }]}>
          {this.renderIcon(2,2)}
            </TouchableOpacity>
        </View>
        <View style = {{paddingTop: 50}} />
        <Button title = "New Game" onPress = {this.onNewGamePress} />
        </View>
   
  );
}
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    borderWidth: 10,
    width: 100,
    height: 100
  },
  tileX: {
    color: "red",
    fontSize: 60,
    marginLeft: 10,
  },
  tileY: {
    color: "green",
    fontSize: 60,
    marginLeft: 10,
  }
});