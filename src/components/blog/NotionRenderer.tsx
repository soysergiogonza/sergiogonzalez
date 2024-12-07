interface NotionRendererProps {
  notionData: any;
}

export const NotionRenderer = ({ notionData }: NotionRendererProps) => {
  const renderBlock = (block: any) => {
    const { type } = block;

    switch (type) {
      case 'paragraph':
        return (
          <p className="my-4 text-gray-700">
            {block.paragraph.rich_text.map((text: any, index: number) => (
              <span 
                key={index}
                className={`
                  ${text.annotations.bold ? 'font-bold' : ''}
                  ${text.annotations.italic ? 'italic' : ''}
                  ${text.annotations.strikethrough ? 'line-through' : ''}
                  ${text.annotations.underline ? 'underline' : ''}
                  ${text.annotations.code ? 'font-mono bg-gray-100 px-1 rounded' : ''}
                `}
              >
                {text.plain_text}
              </span>
            ))}
          </p>
        );
      case 'heading_1':
        return <h1 className="text-3xl font-bold my-4">{block.heading_1.rich_text[0].plain_text}</h1>;
      case 'heading_2':
        return <h2 className="text-2xl font-bold my-3">{block.heading_2.rich_text[0].plain_text}</h2>;
      case 'heading_3':
        return <h3 className="text-xl font-bold my-2">{block.heading_3.rich_text[0].plain_text}</h3>;
      case 'bulleted_list_item':
        return <li className="ml-6 my-2">{block.bulleted_list_item.rich_text[0].plain_text}</li>;
      case 'numbered_list_item':
        return <li className="ml-6 my-2">{block.numbered_list_item.rich_text[0].plain_text}</li>;
      case 'code':
        return (
          <pre className="bg-gray-100 p-4 rounded my-4">
            <code>{block.code.rich_text[0].plain_text}</code>
          </pre>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {notionData.map((block: any) => (
        <div key={block.id}>{renderBlock(block)}</div>
      ))}
    </div>
  );
}; 