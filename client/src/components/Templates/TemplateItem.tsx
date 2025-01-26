import defaultImg from "../../assets/images/default-image.jpg";

const TemplateItem = (props) => {
  return (
    <tr>
      <td className="px-2 w-24 lg:w-auto lg:px-5 py-5 text-sm bg-white border-b border-gray-200">
        <img
          className="w-32 h-24 object-contain mx-auto"
          src={props.image_url ? props.image_url : defaultImg}
          alt="img"
        />
      </td>
      <td className="px-2 lg:px-5 py-5 text-sm bg-white border-b border-gray-200">
      </td>
      <td className="px-2 lg:px-5 py-5 text-sm bg-white border-b border-gray-200">
      </td>
      <td className="px-2 lg:px-5 py-5 text-sm bg-white border-b border-gray-200">
      </td>
    </tr>
  );
};

export default TemplateItem;
