interface Iprops {
  placeholder: string;
  onChange: (e: { target: { value: string; name: string } }) => void;
  lable: string;
  type: string;
  name: string;
  value: string;
}
export default function Input(props: Iprops) {
  return (
    <div className="mt-6">
      <label htmlFor="name">{props.lable} </label>
      <input
        value={props.value}
        onChange={props.onChange}
        id="name"
        name={props.name}
        type={props.type}
        className="bg-slate-100 p-2 w-full outline-none rounded-lg border border-green-600 "
        placeholder={props.placeholder}
      />
    </div>
  );
}
