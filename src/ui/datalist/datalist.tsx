import { useCallback, useEffect, useRef } from 'react';
import styles from './datalist.module.scss';

interface IInputWithDataList {
  placeholder: string;
  type: string;
  data: string[]
}

// interface IDataList {
//     containerId: string
//     inputId: string
//     listId: string
//     options: string[]
// }

class DataList {
  inputId: string;
  containerId: string;
  listId: string;
  options: string[];
  constructor(containerId: string, inputId: string, listId: string, options: string[]) {
    this.containerId = containerId;
    this.inputId = inputId;
    this.listId = listId;
    this.options = options;
  }

  create(filter = "") {
    const list = document.getElementById(this.listId);
    const filterOptions = this.options.filter(
      (d: string) => filter === "" || d.includes(filter)
    );
    if (list !== null) {
        if (filterOptions.length === 0) {
          list.classList.remove("active");
        } else {
          list.classList.add("active");
        }
    
        list.innerHTML = filterOptions
          .map((o: string) => `<li id=${o}>${o}</li>`)
          .join("");
    }
  }

  addListeners(datalist: DataList) {
    const container = document.getElementById(this.containerId);
    const input = document.getElementById(this.inputId);
    const list = document.getElementById(this.listId);
    console.log(container)
    if(container !== null) {
        container.addEventListener("click", (e) => {
          if (e.target.id === this.inputId) {
            container.classList.toggle("active");
            console.log("точка 1")
          } else if (e.target.id === "datalist-icon") {
            container.classList.toggle("active");
            input.focus();
          }
        });
    }
    if(input !==null && container !== null) {
        input.addEventListener("input", function () {
          if (!container.classList.contains("active")) {
            container.classList.add("active");
          }
    
          datalist.create(input.value);
          console.log("точка 2")
        });

    }
    if(list !== null && input !== null && container !== null) {

        list.addEventListener("click", function (e) {
          if (e.target.nodeName.toLocaleLowerCase() === "li") {
            input.value = e.target.innerText;
            container.classList.remove("active");
          }
        });
    }
    }
  }




export const InputWithDataList: React.FC<IInputWithDataList> = ({
    placeholder,
    type,
    data,
    ...rest
}) => {
    
    const datalist = useRef(new DataList(
      "datalist",
      "datalist-input",
      "datalist-ul",
      data
    ))

    const getDataList = useCallback(() => {
        datalist.current.create()
        datalist.current.addListeners(datalist)
    }, [datalist])

    useEffect(() => {
        getDataList()
    }, [getDataList])

  return (
    <div id="datalist" className={styles.datalist}>
      <input
        id="datalist-input"
        className={styles[`datalist-input`]}
        type={type}
        placeholder={placeholder}
        {...rest}
      />
      <i id="datalist-icon" className={styles[`datalist-icon`]} />
      <ul id="datalist-ul" className={styles.list}></ul>
    </div>
  );
};
