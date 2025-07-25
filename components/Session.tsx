import { Pressable, StyleSheet, Text, View } from "react-native";
import GlobalColors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function Session({ date, startTime, endTime,weightBefore,weightAfter ,notes,id}) {

     const navigation= useNavigation<NavigationProp>()

    function handlePress(){
      navigation.navigate("Manage Session",{isEditing:true})
    }

   const fluidRemoved = (weightBefore - weightAfter).toFixed(1);
  
  return (
    <Pressable onPress={handlePress} style={({pressed})=>[styles.container,pressed && styles.pressed]}>
      
     <View style={styles.title}>
        <Text style={styles.titleText}>Session {id}</Text>
     </View>
      <View style={styles.row}>
        <View style={styles.row}>
        <Ionicons name="calendar" size={16} color="#DB3A3A" />
        <Text style={styles.dateText}>{date}</Text>
        </View>
       <View style={styles.row}>
         <Ionicons name="time-outline" size={16} color="#DB3A3A" style={{ marginLeft: 16 }} />
        <Text style={styles.timeText}>{startTime} – {endTime}</Text>
       </View>
       
      </View>

    
      <View style={styles.row}>
        <View style={styles.row}>
           <Ionicons name="scale-outline" size={16} color="#DB3A3A" />
        <Text style={styles.weightText}>
          {weightBefore} kg ➜ {weightAfter} kg
        </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.fluidText}>
           💧 {fluidRemoved} kg removed
         </Text>
        </View>
       
      </View>

     
      {notes ? (
        <View style={styles.notesContainer}>
          <Ionicons name="document-text-outline" size={16} color="#DB3A3A" />
          <Text style={styles.notesText}>{notes}</Text>
        </View>
      ) : null}
  
    </Pressable>
  );
}

export default Session;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: GlobalColors.primary200,
    marginTop: 15,
    marginBottom:5,
    marginHorizontal:20,
    borderRadius: 6,
    shadowColor: "red",
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.4,
    elevation: 1,
  },
  title:{
    flexDirection:"row",
    justifyContent:"center",
    marginBottom:20
  },
  titleText:{
    
    fontWeight:"700"
  },
  pressed:{
    opacity:0.5
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    justifyContent:"space-between"
  },
  dateText: {
    marginLeft: 6,
    fontWeight: "600",
    fontSize: 14,
  },
  timeText: {
    marginLeft: 6,
    fontSize: 14,
  },
  weightText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
  },
  fluidText: {
    marginLeft: 12,
    fontSize: 13,
    color: "#BA2525",
    fontWeight: "500",
  },
  notesContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  notesText: {
    marginLeft: 6,
    fontSize: 13,
    fontStyle: "italic",
    color: "#333",
    flexShrink: 1,
  },
});
