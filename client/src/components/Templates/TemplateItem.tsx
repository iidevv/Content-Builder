import { Link } from "react-router-dom";
import defaultImg from "../../assets/images/default-image.jpg";

function formattedDate(dateString) {
  const date = new Date(dateString);

  const options = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };

  const formattedDate = date.toLocaleString('en-US', options);
  return formattedDate;
}

const TemplateItem = (props) => {
  return (
    <tr>
      <td className="px-2 w-24 lg:w-auto lg:px-5 py-5 text-sm bg-white border-b border-gray-200">
        <Link to={`/templates/${props.id}`}>
          <img
            className="w-32 h-24 object-contain mx-auto"
            src={props.image_url ? props.image_url : defaultImg}
            alt="img"
          />
        </Link>
      </td>
      <td className="px-2 lg:px-5 py-5 text-sm bg-white border-b border-gray-200">
        <Link to={`/templates/${props.id}`}>
          {props.title}
        </Link>
      </td>
      <td className="px-2 lg:px-5 py-5 text-sm bg-white border-b border-gray-200">
        {formattedDate(props.createdAt)}
      </td>
      <td className="px-2 lg:px-5 py-5 text-sm bg-white border-b border-gray-200">
        {formattedDate(props.updatedAt)}
      </td>
      <td className="px-2 lg:px-5 py-5 text-sm bg-white border-b border-gray-200">
      </td>
    </tr>
  );
};

export default TemplateItem;
