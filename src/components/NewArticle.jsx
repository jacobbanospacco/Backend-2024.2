export const NewArticle = ({ title, text, theme }) => {
  return (
    <article
      className={`h-[140px] border-b-2 border-GrayishBlue py-7 last:border-none ${
        theme === 'dark' ? 'text-white' : 'text-black'
      }`}
    >
      <h2
        className={`cursor-pointer hover:text-SoftOrange text-[20px] mb-3 font-bold ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}
      >
        {title}
      </h2>
      <p className={`text-[15px] ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        {text}
      </p>
    </article>
  );
};
