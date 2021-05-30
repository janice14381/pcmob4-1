import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';


export default function App() {
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const [nxtarrival, setNextArrival] = useState("");

  function loadBusStopData(){
    fetch(BUSSTOP_URL)
    .then((response) => {return response.json();})
    .then((responseData) => {
        const myBus = responseData.services.filter(
              (item) => item.no === "155")[0];
             
        setArrival((parseInt(myBus.next.duration_ms)/1000).toFixed(0));
        setNextArrival((myBus.next2.time));
        setLoading(false);
        
    })
  }

    useEffect(()=>{
        const interval = setInterval(loadBusStopData,1500);
        return () => clearInterval(interval)
    },[]);


  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Bus Arrival Time</Text>
      <Text style={{margin:50,color:"grey"}}>{loading?<ActivityIndicator size="large" color="orange" />: arrival} Sec</Text>
      <Text style={styles.paragraph}>Next Arrival Time</Text>
      <Text style={{margin:50,color:"grey"}}>{loading?<ActivityIndicator size="large" color="orange" />: nxtarrival}</Text>

      <TouchableOpacity onPress={loadBusStopData}>
        <Text style={styles.button}>refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button:{
    padding: 20,
    margin:5,
    backgroundColor: 'black',
    color: 'yellow',
    borderRadius: 20,
    fontWeight: 'bold'
  }
});

