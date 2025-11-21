export interface SafetyQuestion {
  id: string;
  tip: string;
  question: string;
  choices: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

export const safetyQuestions: SafetyQuestion[] = [
  {
    id: '1',
    tip: 'لا تشارك معلوماتك الشخصية على الإنترنت',
    question: 'هل يجب أن تشارك عنوان منزلك على وسائل التواصل؟',
    choices: [
      { id: 'a', text: 'نعم، مع الجميع', isCorrect: false },
      { id: 'b', text: 'لا، أبداً', isCorrect: true },
      { id: 'c', text: 'فقط مع الأصدقاء', isCorrect: false },
      { id: 'd', text: 'في بعض الأحيان', isCorrect: false },
    ],
  },
  {
    id: '2',
    tip: 'استخدم كلمات مرور قوية وآمنة',
    question: 'أي من كلمات المرور التالية هي الأكثر أماناً؟',
    choices: [
      { id: 'a', text: '123456', isCorrect: false },
      { id: 'b', text: 'اسمك', isCorrect: false },
      { id: 'c', text: 'Xy9#mK$2pL', isCorrect: true },
      { id: 'd', text: 'password', isCorrect: false },
    ],
  },
  {
    id: '3',
    tip: 'لا تقبل طلبات صداقة من الغرباء',
    question: 'ماذا تفعل عندما يرسل لك شخص غريب طلب صداقة؟',
    choices: [
      { id: 'a', text: 'أقبله فوراً', isCorrect: false },
      { id: 'b', text: 'أرفضه وأخبر والديّ', isCorrect: true },
      { id: 'c', text: 'أرد عليه برسالة', isCorrect: false },
      { id: 'd', text: 'أقبله ثم أحذفه', isCorrect: false },
    ],
  },
  {
    id: '4',
    tip: 'فكر قبل أن تنشر أي شيء على الإنترنت',
    question: 'قبل نشر صورة على الإنترنت، ماذا يجب أن تفعل؟',
    choices: [
      { id: 'a', text: 'أنشرها مباشرة', isCorrect: false },
      { id: 'b', text: 'أستشير والديّ', isCorrect: true },
      { id: 'c', text: 'أنشرها للجميع', isCorrect: false },
      { id: 'd', text: 'أنشرها بسرعة', isCorrect: false },
    ],
  },
  {
    id: '5',
    tip: 'احترم الآخرين على الإنترنت كما في الحياة',
    question: 'كيف يجب أن تتعامل مع الآخرين على الإنترنت؟',
    choices: [
      { id: 'a', text: 'بوقاحة وعدوانية', isCorrect: false },
      { id: 'b', text: 'باحترام ولطف', isCorrect: true },
      { id: 'c', text: 'بتجاهل تام', isCorrect: false },
      { id: 'd', text: 'بسخرية واستهزاء', isCorrect: false },
    ],
  },
  {
    id: '6',
    tip: 'لا تفتح الروابط أو المرفقات من مصادر غير موثوقة',
    question: 'وصلتك رسالة من شخص غريب تحتوي على رابط، ماذا تفعل؟',
    choices: [
      { id: 'a', text: 'أفتح الرابط مباشرة', isCorrect: false },
      { id: 'b', text: 'أحذف الرسالة وأخبر والديّ', isCorrect: true },
      { id: 'c', text: 'أرسل الرابط لأصدقائي', isCorrect: false },
      { id: 'd', text: 'أحفظ الرابط للاحقاً', isCorrect: false },
    ],
  },
  {
    id: '7',
    tip: 'حافظ على خصوصية حساباتك',
    question: 'من يجب أن يعرف كلمة مرورك؟',
    choices: [
      { id: 'a', text: 'جميع أصدقائي', isCorrect: false },
      { id: 'b', text: 'أنا ووالديّ فقط', isCorrect: true },
      { id: 'c', text: 'أي شخص يطلبها', isCorrect: false },
      { id: 'd', text: 'المعلمون في المدرسة', isCorrect: false },
    ],
  },
  {
    id: '8',
    tip: 'أخبر والديك إذا شعرت بأي إزعاج أو تهديد',
    question: 'إذا أرسل لك أحدهم رسالة مزعجة، ماذا تفعل؟',
    choices: [
      { id: 'a', text: 'أحتفظ بها سراً', isCorrect: false },
      { id: 'b', text: 'أخبر والديّ فوراً', isCorrect: true },
      { id: 'c', text: 'أرد بطريقة سيئة', isCorrect: false },
      { id: 'd', text: 'أتجاهلها فقط', isCorrect: false },
    ],
  },
  {
    id: '9',
    tip: 'لا تشارك موقعك الجغرافي على الإنترنت',
    question: 'هل من الآمن مشاركة موقعك الحالي على وسائل التواصل؟',
    choices: [
      { id: 'a', text: 'نعم، دائماً', isCorrect: false },
      { id: 'b', text: 'لا، ليس آمناً', isCorrect: true },
      { id: 'c', text: 'مع الجميع', isCorrect: false },
      { id: 'd', text: 'كل يوم', isCorrect: false },
    ],
  },
  {
    id: '10',
    tip: 'تحقق من إعدادات الخصوصية في حساباتك',
    question: 'لماذا من المهم ضبط إعدادات الخصوصية؟',
    choices: [
      { id: 'a', text: 'ليس مهماً', isCorrect: false },
      { id: 'b', text: 'لحماية معلوماتي الشخصية', isCorrect: true },
      { id: 'c', text: 'لزيادة المتابعين', isCorrect: false },
      { id: 'd', text: 'للظهور أكثر', isCorrect: false },
    ],
  },
];
