"use client";
export const PrettyCodeWrapper = ({
  children,
}: { children: React.ReactNode }) => {
  return (
    <div className='relative'>
      {children}
      <style jsx global>{`
        .rehype-pretty-button-copy {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          line-height: 1;
          background-color: #2d2d2d;
          color: #abb2bf;
          border: 1px solid #4b5263;
          border-radius: 0.25rem;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .rehype-pretty-button-copy:hover {
          background-color: #3e4451;
        }
        .rehype-pretty-code-wrapper:hover .rehype-pretty-button-copy {
          opacity: 1;
        }
        .rehype-pretty-button-copy[data-copied="true"] {
          background-color: #98c379;
          color: #282c34;
        }
      `}</style>
    </div>
  );
};
