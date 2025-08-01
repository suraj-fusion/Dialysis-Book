import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import GlobalColors from "../constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { SessionsContext } from "../store/session-context";
import { getFormattedDate, getFormattedTime } from "../util/date";

import Button from "../components/Button";

const ManageSession = ({ navigation, route }) => {
  const { sessions, addSession, deleteSession, updateSession } =
    useContext(SessionsContext);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const [sessionData, setSessionData] = useState({
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    weightBefore: "",
    weightAfter: "",
    notes: "",
    preDialysisBP: { systolic: "", diastolic: "" },
    postDialysisBP: { systolic: "", diastolic: "" },
  });

  const selectedSessionId = route?.params?.selectedSession;

  const isEditing = selectedSessionId;

  const selectedSession = sessions.filter(
    (session) => session.id === selectedSessionId
  )[0];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Session" : "Add Session",
    });
  }, []);

  useEffect(() => {
    if (isEditing) {
      setSessionData({
        date: new Date(selectedSession.date),
        startTime: new Date(selectedSession.startTime),
        endTime: new Date(selectedSession.endTime),
        weightAfter: selectedSession.weightAfter.toString(),
        weightBefore: selectedSession.weightBefore.toString(),
        notes: selectedSession.notes,
        preDialysisBP: {
          diastolic: selectedSession.preDialysisBP.diastolic.toString(),
          systolic: selectedSession.preDialysisBP.systolic.toString(),
        },
        postDialysisBP: {
          diastolic: selectedSession.postDialysisBP.diastolic.toString(),
          systolic: selectedSession.postDialysisBP.systolic.toString(),
        },
      });
    }
  }, []);

  function validateInput() {
    // Helper function to check if a value is a valid number
    const isValidNumber = (value: any) => !isNaN(Number(value)) && value !== "";

    // Validate startTime and endTime
    const start = new Date(sessionData.startTime);
    const end = new Date(sessionData.endTime);

    if (start >= end) {
      Alert.alert("Error", "Start time must be earlier than End time.");
      return false;
    }

    // Validate preDialysisBP
    if (
      !isValidNumber(sessionData.preDialysisBP.systolic) ||
      !isValidNumber(sessionData.preDialysisBP.diastolic)
    ) {
      Alert.alert(
        "Error",
        "Pre Dialysis Blood Pressure values should be a number and not empty."
      );
      return false;
    }

    // Validate postDialysisBP
    if (
      !isValidNumber(sessionData.postDialysisBP.systolic) ||
      !isValidNumber(sessionData.postDialysisBP.diastolic)
    ) {
      Alert.alert(
        "Error",
        "Post Dialysis Blood Pressure values should be a number and not empty."
      );
      return false;
    }

    // Validate weightBefore
    if (!isValidNumber(sessionData.weightBefore)) {
      Alert.alert(
        "Error",
        "Pre Dialysis Weight should be a number and not empty."
      );
      return false;
    }

    // Validate weightAfter
    if (!isValidNumber(sessionData.weightAfter)) {
      Alert.alert(
        "Error",
        "Post Dialysis Weight should be a number and not empty."
      );
      return false;
    }

    console.log(sessionData)

    if (Number(sessionData.weightAfter) > Number(sessionData.weightBefore)) {
      Alert.alert(
        "Error",
        "Post Dialysis Weight must be smaller than Pre Dialysis Weight"
      );
      return false;
    }

    return true;
  }

  function addSessionHandler() {
    if (!validateInput()) return;
    const newSession = {
      date: getFormattedDate(sessionData.date),
      startTime: sessionData.startTime.toString(),
      endTime: sessionData.endTime.toString(),
      weightBefore: Number(sessionData.weightBefore),
      weightAfter: Number(sessionData.weightAfter),
      notes: sessionData.notes,
      postDialysisBP: {
        systolic: Number(sessionData.postDialysisBP.systolic),
        diastolic: Number(sessionData.postDialysisBP.diastolic),
      },
      preDialysisBP: {
        systolic: Number(sessionData.preDialysisBP.systolic),
        diastolic: Number(sessionData.preDialysisBP.diastolic),
      },
    };

    addSession(newSession);
    navigation.goBack();
  }

  function updateSessionHandler() {
    if (!validateInput()) return;
    const updatedSessionData = {
      date: getFormattedDate(sessionData.date),
      startTime: sessionData.startTime.toString(),
      endTime: sessionData.endTime.toString(),
      weightBefore: Number(sessionData.weightBefore),
      weightAfter: Number(sessionData.weightAfter),
      notes: sessionData.notes,
      id: selectedSessionId,
      postDialysisBP: {
        systolic: Number(sessionData.postDialysisBP.systolic),
        diastolic: Number(sessionData.postDialysisBP.diastolic),
      },
      preDialysisBP: {
        systolic: Number(sessionData.preDialysisBP.systolic),
        diastolic: Number(sessionData.preDialysisBP.diastolic),
      },
    };

    updateSession(updatedSessionData, selectedSessionId);
    navigation.goBack();
  }

  function deleteSessionHandler() {
    deleteSession(selectedSessionId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: GlobalColors.primary300 }}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView style={styles.rootContainer}>
        <View style={styles.inputContainer}>
          <View>
            <View style={styles.dateTime}>
              <Text style={styles.labelText}>Date</Text>

              {Platform.OS === "ios" ? (
                <DateTimePicker
                  value={sessionData.date}
                  mode="date"
                  display="default"
                  onChange={(e, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate)
                      setSessionData((prev) => ({
                        ...prev,
                        date: selectedDate,
                      }));
                  }}
                />
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={styles.androidDateTime}
                  >
                    <Text>{getFormattedDate(sessionData.date)}</Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={sessionData.date}
                      mode="date"
                      display="calendar"
                      onChange={(e, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate)
                          setSessionData((prev) => ({
                            ...prev,
                            date: selectedDate,
                          }));
                      }}
                    />
                  )}
                </>
              )}
            </View>
            <View style={styles.dateTime}>
              <Text style={styles.labelText}>Start Time</Text>

              {Platform.OS === "ios" ? (
                <DateTimePicker
                  value={sessionData.startTime}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={(e, selectedTime) => {
                    setShowStartTimePicker(false);
                    if (selectedTime)
                      setSessionData((prev) => ({
                        ...prev,
                        startTime: selectedTime,
                      }));
                  }}
                />
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => setShowStartTimePicker(true)}
                    style={styles.androidDateTime}
                  >
                    <Text>
                      {getFormattedTime(sessionData.startTime.toISOString())}
                    </Text>
                  </TouchableOpacity>
                  {showStartTimePicker && (
                    <DateTimePicker
                      value={sessionData.startTime}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={(e, selectedTime) => {
                        setShowStartTimePicker(false);
                        if (selectedTime)
                          setSessionData((prev) => ({
                            ...prev,
                            startTime: selectedTime,
                          }));
                      }}
                    />
                  )}
                </>
              )}
            </View>
            <View style={styles.dateTime}>
              <Text style={styles.labelText}>End Time</Text>

              {Platform.OS === "ios" ? (
                <DateTimePicker
                  value={sessionData.endTime}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={(e, selectedTime) => {
                    setShowEndTimePicker(false);
                    if (selectedTime)
                      setSessionData((prev) => ({
                        ...prev,
                        endTime: selectedTime,
                      }));
                  }}
                />
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.androidDateTime}
                    onPress={() => setShowEndTimePicker(true)}
                  >
                    <Text>
                      {getFormattedTime(sessionData.endTime.toISOString())}
                    </Text>
                  </TouchableOpacity>
                  {showEndTimePicker && (
                    <DateTimePicker
                      value={sessionData.endTime}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={(e, selectedTime) => {
                        setShowEndTimePicker(false);
                        if (selectedTime)
                          setSessionData((prev) => ({
                            ...prev,
                            endTime: selectedTime,
                          }));
                      }}
                    />
                  )}
                </>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.labelText}> Pre Dialysis Blood Pressure</Text>
            <View style={styles.bpContainer}>
              <KeyboardAvoidingView style={styles.bpReadingContainer}>
                <Text>Systolic</Text>
                <TextInput
                  style={[styles.textInput, styles.textInput2]}
                  value={sessionData.preDialysisBP.systolic}
                 placeholderTextColor="gray"
                  placeholder="Enter here"
                  keyboardType="numeric"
                  onChangeText={(enteredText) =>
                    setSessionData((prev) => ({
                      ...sessionData,
                      preDialysisBP: {
                        ...prev.preDialysisBP,
                        systolic: enteredText,
                      },
                    }))
                  }
                />
              </KeyboardAvoidingView>

              <View style={styles.bpReadingContainer}>
                <Text>Diastolic</Text>
                <TextInput
                  style={[styles.textInput, styles.textInput2]}
                  value={sessionData.preDialysisBP.diastolic}
                   placeholderTextColor="gray"
                  keyboardType="numeric"
                  placeholder="Enter here"
                  onChangeText={(enteredText) =>
                    setSessionData((prev) => ({
                      ...sessionData,
                      preDialysisBP: {
                        ...prev.preDialysisBP,
                        diastolic: enteredText,
                      },
                    }))
                  }
                />
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.labelText}> Post Dialysis Blood Pressure</Text>
            <View style={styles.bpContainer}>
              <View style={styles.bpReadingContainer}>
                <Text>Systolic</Text>
                <TextInput
                  style={[styles.textInput, styles.textInput2]}
                  value={sessionData.postDialysisBP.systolic}
                  placeholder="Enter here"
                  placeholderTextColor="gray"
                  keyboardType="numeric"
                  onChangeText={(enteredText) =>
                    setSessionData((prev) => ({
                      ...sessionData,
                      postDialysisBP: {
                        ...prev.postDialysisBP,
                        systolic: enteredText,
                      },
                    }))
                  }
                />
              </View>

              <View style={styles.bpReadingContainer}>
                <Text>Diastolic</Text>
                <TextInput
                  style={[styles.textInput, styles.textInput2]}
                  value={sessionData.postDialysisBP.diastolic}
                  placeholderTextColor="gray"
                  placeholder="Enter here"
                  keyboardType="numeric"
                  onChangeText={(enteredText) =>
                    setSessionData((prev) => ({
                      ...sessionData,
                      postDialysisBP: {
                        ...prev.postDialysisBP,
                        diastolic: enteredText,
                      },
                    }))
                  }
                />
              </View>
            </View>
          </View>

          <View>
            <Text style={styles.labelText}>Pre Dialysis Weight</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Pre Dialysis Weight"
              keyboardType="numeric"
              value={sessionData.weightBefore}
               placeholderTextColor="gray"
              onChangeText={(enteredText) =>
                setSessionData((prev) => ({
                  ...prev,
                  weightBefore: enteredText,
                }))
              }
            />
            <Text style={styles.labelText}>Post Dialysis Weight</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Post Dialysis Weight"
              keyboardType="numeric"
                placeholderTextColor="gray"
              value={sessionData.weightAfter}
              onChangeText={(enteredText) =>
                setSessionData((prev) => ({
                  ...prev,
                  weightAfter: enteredText,
                }))
              }
            />
            <Text style={styles.labelText}>Notes</Text>
            <TextInput
              style={[styles.textInput, styles.notesInput]}
              placeholder="Enter Notes"
              multiline={true}
              numberOfLines={4}
              value={sessionData.notes}
               placeholderTextColor="gray"
              onChangeText={(enteredText) =>
                setSessionData((prev) => ({ ...prev, notes: enteredText }))
              }
            />
          </View>

          <View style={styles.mainButtonContainer}>
            <Button
              text={isEditing ? "Save" : "Add"}
              onPress={isEditing ? updateSessionHandler : addSessionHandler}
              style={styles.button}
            />
            {isEditing && (
              <Button
                text="Delete"
                onPress={deleteSessionHandler}
                style={styles.button}
              />
            )}

            <View style={styles.mainButtonContainer}>
              <Button
                text="Cancel"
                onPress={cancelHandler}
                style={styles.button}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    fontSize: 15,
    fontWeight: 600,
  },
  textInput: {
    padding: 15,
    width: "100%",
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: GlobalColors.primary100,
    marginBottom: 10,
    textAlignVertical: "top",
    textAlign: "left",
  },
  dateTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  notesInput: {
    height: 100,
  },

  textInput2: {
    width: 100,
    textAlign: "center",
  },
  bpContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  bpReadingContainer: {
    alignItems: "center",
  },
  buttonsContainer: {
    gap: 10,
  },
  mainButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    width: 100,
    height: 40,
    borderRadius: 20,
  },

  androidDateTime: {
    backgroundColor: "#eca5a5",
    borderRadius: 5,
    padding: 6,
  },
});
