function Developer() {
  return (
    <section className="py-20 bg-gray-100">

      <div className="max-w-4xl mx-auto text-center px-6">

        <h2 className="text-5xl font-bold mb-10">
          👨‍💻 Meet the Creator
        </h2>

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <div className="w-28 h-28 rounded-full bg-blue-600 text-white text-4xl font-bold flex items-center justify-center mx-auto mb-6">
            DK
          </div>

          <h3 className="text-3xl font-bold">
            Dinesh Kumar Sahoo
          </h3>

          <p className="text-gray-500 mt-2">
            Computer Science Undergraduate
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
              Java Full Stack Developer
            </span>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
              MERN Stack Developer
            </span>

            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
              AI Engineer
            </span>

          </div>

          <p className="mt-8 text-gray-600 text-lg">
            Building technology solutions that help students
            and job seekers understand their skills,
            identify gaps, and discover better opportunities.
          </p>

          <div className="flex justify-center gap-6 mt-8">

            <a
              href="https://github.com/DineshKumarSahoo-2005"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-blue-600"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/dinesh-kumar-sahoo-260623294/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-blue-600"
            >
              LinkedIn
            </a>

            <a
              href="mailto:dineshkumarsahoo30776@gmail.com"
              className="font-semibold text-blue-600"
            >
              Email
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Developer;