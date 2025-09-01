import { h } from "preact";
import { useState, useRef, useEffect } from 'preact/hooks';
import * as Icons from "lucide-react";

export default function Accordion({ title, children, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef(null);
  const [height, setHeight] = useState('0px');

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen, children]);

  return (
    <div className="bg-white shadow-md rounded-md mb-3 overflow-hidden transition-shadow w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full p-4 text-left text-md text-gray-700 font-semibold flex justify-between items-center cursor-pointer transition-colors duration-200 focus:outline-none"
      >
        {title}
        <Icons.ChevronRight
          size={20}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
        />
      </button>

      <div
        ref={contentRef}
        className={`overflow-hidden transition-[max-height,padding] duration-300 ease-in-out`}
        style={{ maxHeight: height }}
      >
        <div className={`px-5 ${isOpen ? 'pb-4' : 'pb-0'} transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
