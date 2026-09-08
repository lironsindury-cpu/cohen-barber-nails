// ============================================================
// הגדרות Firebase - קובץ זה מחבר את האתר לחשבון Firebase שלכם
// ============================================================
// שלבים חד-פעמיים כדי להפעיל את מערכת ההתחברות והלוח שנה לספרים:
//
// 1. כנסו ל-https://console.firebase.google.com והתחברו עם חשבון Google.
// 2. לחצו "Add project" / "הוספת פרויקט", תנו שם (למשל cohen-barber-nails), המשיכו עם ברירות המחדל.
// 3. במסך הראשי של הפרויקט, לחצו על סמל ה-Web ( </> ) כדי להוסיף "אפליקציית ווב".
//    תנו לה שם - אין צורך לסמן Hosting.
// 4. Firebase יציג לכם קטע קוד עם אובייקט בשם firebaseConfig - העתיקו את הערכים
//    (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId)
//    לתוך האובייקט למטה, במקום הערכים "REPLACE_ME".
// 5. בתפריט הצד: Build -> Authentication -> Get started -> Sign-in method ->
//    הפעילו את "Email/Password".
// 6. באותה לשונית Authentication -> Users -> Add user - צרו לכל ספר/ית משתמש
//    עם אימייל וסיסמה משלה/ו (זה מה שהיא/הוא יקליד/ו כדי להתחבר לאתר).
// 7. בתפריט הצד: Build -> Firestore Database -> Create database -> Production mode.
//    אחר כך בלשונית Rules הדביקו את החוקים הבאים ולחצו Publish:
//
//    rules_version = '2';
//    service cloud.firestore {
//      match /databases/{database}/documents {
//        match /bookings/{docId} {
//          allow create: if true;
//          allow read: if request.auth != null && request.auth.token.email == resource.data.providerEmail;
//        }
//      }
//    }
//
// 8. פתחו את הקובץ script.js, מצאו את הרשימה PROVIDERS_LIST (בתחילת הקובץ),
//    ולכל ספר/ית הוסיפו שורת email: 'האימייל-שיצרתם-לו-בשלב-6@example.com'
//    בדיוק כמו האימייל שנרשם ב-Firebase Authentication. זה מה שמקשר בין
//    ההתחברות של הספר/ית לבין התורים שהוא/היא רואה בלוח השנה שלו/ה.
//
// עד שהערכים למטה לא יוחלפו, אזור ההתחברות באתר יציג הודעה שהמערכת בהקמה.
window.firebaseConfig = {
  apiKey: "AIzaSyC_QoR6IPDfBmeOWlhYfWsWIwgOxWdN-10",
  authDomain: "cohen-barber-nails.firebaseapp.com",
  projectId: "cohen-barber-nails",
  storageBucket: "cohen-barber-nails.firebasestorage.app",
  messagingSenderId: "707455536443",
  appId: "1:707455536443:web:5e37c924a15c9bb1647b1e"
};
