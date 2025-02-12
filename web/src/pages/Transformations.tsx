import { ConversionCanvas } from "../components/transformations/ConversionCanvas";
import { PresetLibrary } from "../components/transformations/PresetLibrary";
import { ConversionHistory } from "../components/transformations/ConversionHistory";

const Transformations = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-fade-in">
      <div className="flex-1 space-y-6">
        <ConversionCanvas />
        <ConversionHistory />
      </div>
      <div className="w-full lg:w-80">
        <PresetLibrary />
      </div>
    </div>
  );
};

export default Transformations;
