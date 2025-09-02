
import { Alert } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { DialysisSession } from "../types";
import { getFormattedTime } from "./date";

export   const generateAndSharePDF = async (sessions:DialysisSession[],type) => {

    if(sessions.length==0)
    {
      Alert.alert("Error","No recent sessions")
      return;
    }
    try {
      // 1. Build HTML
      let htmlContent = `
        <h1 style="text-align:center;">${type} Dialysis Sessions</h1>
        <table border="1" cellspacing="0" cellpadding="8" width="100%">
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Weight Change</th>
            <th>Water Removed</th>
            <th>Blood Pressure Changes</th>
            <th>Notes</th>
          </tr>
          ${sessions?.map(
              (s:DialysisSession) => `
            <tr>
              <td>${s.date}</td>
              <td>${ getFormattedTime(s.startTime ) } -${ getFormattedTime(s.endTime)} </td>
              <td>${s.weightBefore}kg-${s.weightAfter}kg</td>
              <td>${Number(s.weightAfter) - Number(s.weightBefore)}kg</td>
              <td>${s.preDialysisBP.systolic}/${s.preDialysisBP.diastolic}-${s.postDialysisBP.systolic}/${s.postDialysisBP.diastolic}</td>
              <td>${s.notes || "N/A"}</td>
            </tr>
          `
            )
            .join("")}
        </table>
      `;

      // 2. Generate PDF
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      // 3. Share PDF
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: "application/pdf",
          dialogTitle: "Share Recent Sessions PDF",
        });
      } else {
        alert("Sharing not available on this device");
      }
    } catch (err) {
      console.error("PDF generation error:", err);
    }
  };