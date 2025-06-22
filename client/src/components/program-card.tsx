import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import type { Program } from "@shared/schema";

interface ProgramCardProps {
  program: Program;
}

const ProgramCard = ({ program }: ProgramCardProps) => {
  const progressPercentage = (program.currentNumber / program.targetNumber) * 100;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "education":
        return "🎓";
      case "healthcare":
        return "🏥";
      case "nutrition":
        return "🍎";
      default:
        return "❤️";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "education":
        return "bg-trust-blue";
      case "healthcare":
        return "bg-success-green";
      case "nutrition":
        return "bg-hope-orange";
      default:
        return "bg-trust-blue";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
      <img src={program.imageUrl} alt={program.title} className="w-full h-48 object-cover" />
      <div className="p-8">
        <div className={`w-12 h-12 ${getCategoryColor(program.category)} rounded-full flex items-center justify-center mb-4`}>
          <span className="text-2xl">{getCategoryIcon(program.category)}</span>
        </div>
        <h3 className="text-2xl font-bold text-charcoal mb-4">{program.title}</h3>
        <p className="text-gray-600 mb-6">{program.description}</p>

        {/* Progress Tracker */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{new Date().getFullYear()} Goal: {program.targetNumber.toLocaleString()}</span>
            <span>{program.currentNumber.toLocaleString()} reached</span>
          </div>
          <Progress value={progressPercentage} className="w-full" />
        </div>

        <Link href={`/programs/${program.id}`}>
          <Button className={`w-full ${getCategoryColor(program.category)} text-white py-3 rounded-lg hover:opacity-90 transition-colors`}>
            Learn More About {program.title}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProgramCard;
