// ============================================================
// הגדרות EmailJS - שליחת מייל אישור אוטומטי ללקוחות שקבעו תור
// ============================================================
// שלבים חד-פעמיים כדי להפעיל שליחת מיילים אוטומטית ללקוחות:
//
// 1. כנסו ל-https://www.emailjs.com והרשמו לחשבון חינמי (Sign Up).
// 2. בתפריט הצד: Email Services -> Add New Service. חברו את תיבת המייל
//    שלכם (למשל Gmail) ואשרו את החיבור. תקבלו Service ID (למשל service_xxxxxxx).
// 3. בתפריט הצד: Email Templates -> Create New Template.
//    צרו תבנית עם הטקסט שתרצו לשלוח ללקוח, ותוכלו להשתמש במשתנים הבאים
//    בתוך התבנית (בדיוק כך, עם הסוגריים המסולסלים):
//    {{to_email}} {{customer_name}} {{service_name}} {{provider_name}}
//    {{booking_date}} {{booking_time}} {{area}}
//    ודאו שבהגדרות התבנית (לשונית Settings), בשדה "To Email", מוזן {{to_email}}.
//    שמרו וקבלו Template ID (למשל template_xxxxxxx).
// 4. בתפריט הצד: Account -> General -> מצאו את ה-Public Key שלכם.
// 5. הדביקו את שלושת הערכים למטה במקום "REPLACE_ME".
//
// עד שהערכים למטה לא יוחלפו, פשוט לא יישלח מייל אישור ללקוחות - שאר האתר
// (כולל התור עצמו וההודעה לספר/ית) ימשיך לעבוד כרגיל.
window.emailjsConfig = {
serviceId: "REPLACE_ME",
templateId: "REPLACE_ME",
publicKey: "REPLACE_ME"
};