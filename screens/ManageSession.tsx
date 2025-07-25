import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import GlobalColors from "../constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { SessionsContext } from "../store/session-context";

const ManageSession = ({ navigation, route }) => {
  const { sessions, addSession } = useContext(SessionsContext);
  const [sessionData, setSessionData] = useState({
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    weightBefore: "",
    weightAfter: "",
    notes: "",
  });

  const isEditing = route?.params?.isEditing;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Session" : "Add Session",
    });
  }, []);


  useEffect(()=>{
    if(isEditing)
    {

    }
  },[])



  function addSessionHandler() {
  
    const newSession = {
      date: sessionData.date.toISOString().slice(0, 10),
      startTime: sessionData.startTime.toTimeString().slice(0, 5),
      endTime: sessionData.endTime.toTimeString().slice(0, 5),
      weightBefore: Number(sessionData.weightBefore),
      weightAfter: Number(sessionData.weightAfter),
      notes: sessionData.notes,
      
    };

   
    addSession(newSession);
    navigation.goBack()
  }

  function cancelHandler()
  {
    navigation.goBack()
  }
  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.inputContainer}>
        <View>
          <View style={styles.dateTime}>
            <Text style={styles.labelText}>Date</Text>

            <DateTimePicker
              testID="dateTimePicker"
              value={sessionData.date}
              mode="date"
              is24Hour={true}
              onChange={(_, selectedDate: Date) => {
                setSessionData((prev) => ({ ...prev, date: selectedDate }));
              }}
              style={styles.dateTimePicker}
            />
          </View>
          <View style={styles.dateTime}>
            <Text style={styles.labelText}>Start Time</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={sessionData.startTime}
              mode="time"
              is24Hour={true}
              onChange={(_, selectedDate: Date) => {
                setSessionData((prev) => ({
                  ...prev,
                  startTime: selectedDate,
                }));
              }}
            />
          </View>
          <View style={styles.dateTime}>
            <Text style={styles.labelText}>End Time</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={sessionData.endTime}
              mode="time"
              is24Hour={true}
              onChange={(_, selectedDate: Date) => {
                setSessionData((prev) => ({ ...prev, endTime: selectedDate }));
              }}
            />
          </View>
          <Text style={styles.labelText}>Pre Dialysis Weight</Text>
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Pre Dialysis Weight"
            keyboardType="numeric"
            value={sessionData.weightBefore}
            onChangeText={(enteredText) =>
              setSessionData((prev) => ({ ...prev, weightBefore: enteredText }))
            }
          />
          <Text style={styles.labelText}>Post Dialysis Weight</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Post Dialysis Weight"
            keyboardType="numeric"
            value={sessionData.weightAfter}
            onChangeText={(enteredText) =>
              setSessionData((prev) => ({ ...prev, weightAfter: enteredText }))
            }
          />
          <Text style={styles.labelText}>Notes</Text>
          <TextInput
            style={[styles.textInput, styles.notesInput]}
            placeholder="Enter Notes"
            multiline={true}
            numberOfLines={4}
            value={sessionData.notes}
            onChangeText={(enteredText) =>
              setSessionData((prev) => ({ ...prev, notes: enteredText }))
            }
          />
        </View>
      </View>
      <Button title="Add" onPress={addSessionHandler} />
       <Button title="Cancel" onPress={cancelHandler} />
    </ScrollView>
  );
};

export default ManageSession;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: GlobalColors.primary300,
    paddingBottom: 30,
  },
  inputContainer: {
    padding: 20,
  },
  labelText: {
    fontSize: 20,
    fontWeight: 500,
  },
  textInput: {
    padding: 15,
    width: "100%",
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: GlobalColors.primary50,
    marginBottom: 10,
  },
  dateTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  notesInput: {
    height: 100,
  },
});
