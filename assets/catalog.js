/* SpatialSprout 3D catalogue.
   To add a book: copy it into /books/<slug>/ and add (or update) one entry below.
   status: "live" (opens the book) or "planned" (shown as coming soon). */
window.CATALOG = {
  strands: {
    "Number":             { letter: "B", color: "var(--number)" },
    "Algebra":            { letter: "C", color: "var(--algebra)" },
    "Data":               { letter: "D", color: "var(--data)" },
    "Spatial Sense":      { letter: "E", color: "var(--spatial)" },
    "Financial Literacy": { letter: "F", color: "var(--money)" }
  },
  books: [
    { grade: 1, subject: "Math", status: "planned" },
    { grade: 2, subject: "Math", status: "planned" },
    {
      grade: 3, subject: "Math", status: "live", slug: "grade-3-math",
      title: "The Interactive Classroom: Grade 3 Math",
      author: "M. A. Mafodh",
      blurb: "22 lessons across all five strands of the Ontario Grade 3 math curriculum. Each lesson has a Learn spread and a Practice spread with a 3D game.",
      lessons: [
        { t: "Hundreds, tens and ones", s: "Number", c: ["B1.1", "B1.5", "C2.3"] },
        { t: "Skip counting to 1000", s: "Number", c: ["B1.4", "B1.2"] },
        { t: "Rounding and estimating", s: "Number", c: ["B1.3", "B2.3"] },
        { t: "Adding and subtracting to 1000", s: "Number", c: ["B2.4", "B2.5", "C1.4"] },
        { t: "Multiplying with arrays", s: "Number", c: ["B2.1", "B2.2", "B2.6"] },
        { t: "Fair shares and dividing", s: "Number", c: ["B1.6", "B2.7", "B2.6"] },
        { t: "Fractions of a whole", s: "Number", c: ["B1.6", "B2.8"] },
        { t: "Equivalent fractions", s: "Number", c: ["B1.7"] },
        { t: "Ratios: scaling up", s: "Number", c: ["B2.9"] },
        { t: "Repeating and growing patterns", s: "Algebra", c: ["C1.1", "C1.2", "C1.3", "C1.4"] },
        { t: "Balance and equations", s: "Algebra", c: ["C2.1", "C2.2"] },
        { t: "Code a robot", s: "Algebra", c: ["C3.1", "C3.2", "E1.4"] },
        { t: "Sorting with Venn diagrams", s: "Data", c: ["D1.1"] },
        { t: "Pictographs and bar graphs", s: "Data", c: ["D1.2", "D1.3", "D1.5"] },
        { t: "Mean and mode", s: "Data", c: ["D1.4", "D2.2"] },
        { t: "How likely is it?", s: "Data", c: ["D2.1"] },
        { t: "Faces, edges and vertices", s: "Spatial Sense", c: ["E1.1", "E1.2", "E1.3"] },
        { t: "Measuring length", s: "Spatial Sense", c: ["E2.2", "E2.5"] },
        { t: "Mass and capacity", s: "Spatial Sense", c: ["E2.3", "E2.4"] },
        { t: "Perimeter and area", s: "Spatial Sense", c: ["E2.1", "E2.7", "E2.8", "E2.9"] },
        { t: "Telling time", s: "Spatial Sense", c: ["E2.6"] },
        { t: "Coins, bills and change", s: "Financial Literacy", c: ["F1.1"] }
      ]
    },
    {
      grade: 4, subject: "Math", status: "live", slug: "grade-4-math",
      title: "The Interactive Classroom: Grade 4 Math",
      author: "M. A. Mafodh",
      blurb: "28 lessons covering all 48 Grade 4 math expectations, with place-value disks, fraction bars, coding with nested loops, coordinate grids and more.",
      lessons: [
        { t: "Place value to 10 000", s: "Number", c: ["B1.1", "B1.2"] },
        { t: "Rounding to 10, 100 and 1000", s: "Number", c: ["B1.3"] },
        { t: "Fractions from halves to tenths", s: "Number", c: ["B1.4", "B1.6"] },
        { t: "Comparing fair shares", s: "Number", c: ["B1.5"] },
        { t: "Decimal tenths", s: "Number", c: ["B1.7", "B1.8", "B1.9"] },
        { t: "Multiplication facts to 10 × 10", s: "Number", c: ["B2.2", "B2.1"] },
        { t: "Multiplying by 10, 100 and 1000", s: "Number", c: ["B2.3"] },
        { t: "Adding and subtracting to 10 000", s: "Number", c: ["B2.4"] },
        { t: "Multiplying bigger numbers", s: "Number", c: ["B2.5"] },
        { t: "Dividing and remainders", s: "Number", c: ["B2.6"] },
        { t: "Adding unit fractions", s: "Number", c: ["B2.7"] },
        { t: "Rates: for every one", s: "Number", c: ["B2.8"] },
        { t: "Patterns, tables and graphs", s: "Algebra", c: ["C1.1", "C1.2", "C1.3", "C1.4"] },
        { t: "Variables and equations", s: "Algebra", c: ["C2.1", "C2.2"] },
        { t: "Inequalities on a number line", s: "Algebra", c: ["C2.3"] },
        { t: "Coding with nested loops", s: "Algebra", c: ["C3.1", "C3.2"] },
        { t: "Kinds of data and stem-and-leaf plots", s: "Data", c: ["D1.1", "D1.2"] },
        { t: "Double-bar graphs", s: "Data", c: ["D1.3", "D1.4", "D1.6"] },
        { t: "Mean, median and mode", s: "Data", c: ["D1.5", "D2.2"] },
        { t: "The probability line", s: "Data", c: ["D2.1"] },
        { t: "Properties of rectangles", s: "Spatial Sense", c: ["E1.1"] },
        { t: "Coordinates and transformations", s: "Spatial Sense", c: ["E1.2", "E1.3"] },
        { t: "Right, acute, obtuse and straight angles", s: "Spatial Sense", c: ["E2.4"] },
        { t: "Grams, kilograms, millilitres and litres", s: "Spatial Sense", c: ["E2.1", "E2.2"] },
        { t: "Elapsed time", s: "Spatial Sense", c: ["E2.3"] },
        { t: "Area of rectangles", s: "Spatial Sense", c: ["E2.5", "E2.6"] },
        { t: "Paying and making change", s: "Financial Literacy", c: ["F1.1", "F1.2"] },
        { t: "Earn, spend, save and share", s: "Financial Literacy", c: ["F1.3", "F1.4", "F1.5"] }

      ]
    },
    { grade: 5, subject: "Math", status: "planned" },
    { grade: 6, subject: "Math", status: "planned" },
    { grade: 7, subject: "Math", status: "planned" },
    { grade: 8, subject: "Math", status: "planned" }
  ],
  moreSubjects: ["Science and Technology", "Language", "Social Studies", "History and Geography"]
};
