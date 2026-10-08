// Glass segmented control for switching between the two wallets.
// One glass thumb slides between the labels and stretches slightly while
// the wallets swap.

const SEGMENT = 116;

const OPTIONS = [
  { id: 'h', label: 'Horizontal' },
  { id: 'v', label: 'Vertical' },
];

export default function OrientationSwitch({ value, visible, enabled, stretching, onChange }) {
  const offset = OPTIONS.findIndex((option) => option.id === value) * SEGMENT;
  return (
    <div
      inert={!visible}
      className={`glass-track absolute left-1/2 top-[22px] z-[5] flex -translate-x-1/2 rounded-[26px] p-1 transition-opacity duration-[220ms] ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${enabled ? '' : 'pointer-events-none'}`}
    >
      <span
        aria-hidden="true"
        className="glass-thumb absolute left-1 top-1 h-11 rounded-[22px] transition-transform duration-[460ms] ease-thumb"
        style={{ width: SEGMENT, transform: `translateX(${offset}px) scaleX(${stretching ? 1.1 : 1})` }}
      />
      {OPTIONS.map((option) => {
        const selected = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.id)}
            className={`relative h-11 cursor-pointer rounded-[22px] text-sm transition-colors duration-[220ms] ${
              selected ? 'font-semibold text-[#17171A]' : 'font-medium text-[rgb(23_23_26/0.72)]'
            }`}
            style={{ width: SEGMENT }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
