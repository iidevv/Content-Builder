import { Button } from "../common/Button/Button";
import TemplateItem from "./TemplateItem";

const Templates = (props) => {
  const handleSearch = (e) => {
    const search = e.target.value;
    props.onSearch("", search);
  };

  const onPageChanged = (page) => {
    props.onPageChanged(page, props.search);
  };

  const onAddNewTemplate = () => {
    props.onAddNewTemplate();
  };

  return (
    <>
      <h2 className="text-2xl leading-tight mb-4">
        Templates
      </h2>
      <Button onClick={onAddNewTemplate}>Add new</Button>
      {props.templates && (
        <>
          <div className="flex flex-col-reverse lg:flex-row">
            <div className="flex w-full shadow bg-white p-2">
              <input
                type="text"
                value={props.search}
                onChange={handleSearch}
                className="rounded-lg border-transparent flex-1 appearance-none mr-2 border w-full py-2 px-4 text-gray-600 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="py-4 overflow-x-auto">
            <div className="inline-block min-w-full rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 hidden lg:table-cell text-sm text-center font-normal text-gray-800 uppercase bg-white border-b border-gray-200"
                    ></th>
                    <th
                      scope="col"
                      className="px-2 lg:px-5 py-3 hidden lg:table-cell text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 hidden lg:table-cell text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      created At
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 hidden lg:table-cell text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      updated At
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 hidden lg:table-cell text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.templates.map(t => (
                    <TemplateItem
                      key={t.id}
                      id={t.id}
                      name={t.name}
                      url={t.url}
                      sku={t.sku}
                      image_url={t.image_url}
                      price={t.price}
                      inventory={t.inventory}
                    />
                  ))}
                </tbody>
              </table>
              <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      onPageChanged(props.page - 1);
                    }}
                    value={props.page - 1}
                    disabled={props.page > 1 ? false : true}
                    className="disabled:opacity-50 w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100"
                  >
                    <svg
                      width="9"
                      fill="currentColor"
                      height="8"
                      className=""
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onPageChanged(props.page + 1);
                    }}
                    disabled={props.page <= props.totalPage ? false : true}
                    className="disabled:opacity-50 w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100"
                  >
                    <svg
                      width="9"
                      fill="currentColor"
                      height="8"
                      className=""
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )
      }
    </>
  );
};

export default Templates;
