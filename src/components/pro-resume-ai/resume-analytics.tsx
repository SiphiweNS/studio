
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { type ResumeData } from '@/lib/types';
import { RadialBarChart, RadialBar, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ResumeAnalyticsProps {
    resumeData: ResumeData;
}

export default function ResumeAnalytics({ resumeData }: ResumeAnalyticsProps) {
    const calculateScore = () => {
        let score = 0;
        let maxScore = 5;
        if (resumeData.personalInfo.summary) score++;
        if (resumeData.experience.length > 0 && resumeData.experience[0].jobTitle) score++;
        if (resumeData.education.length > 0 && resumeData.education[0].degree) score++;
        if (resumeData.skills.length > 0) score++;
        if (resumeData.personalInfo.linkedin) score++;
        return Math.round((score / maxScore) * 100);
    };

    const score = calculateScore();

    const data = [
        {
            name: 'Resume Score',
            uv: score,
            fill: 'hsl(var(--primary))',
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-xl">Resume Analytics</CardTitle>
                <CardDescription>Your resume at a glance.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart 
                            cx="50%" 
                            cy="50%" 
                            innerRadius="60%" 
                            outerRadius="100%" 
                            barSize={20} 
                            data={data}
                            startAngle={90}
                            endAngle={-270}
                        >
                            <RadialBar
                                minAngle={15}
                                background
                                clockWise
                                dataKey="uv"
                            />
                            <Tooltip 
                                contentStyle={{
                                    background: 'hsl(var(--background))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: 'var(--radius)',
                                }}
                            />
                             <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="fill-foreground text-3xl font-bold"
                            >
                                {`${score}%`}
                            </text>
                            <text
                                x="50%"
                                y="65%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="fill-muted-foreground text-sm"
                            >
                                Score
                            </text>
                        </RadialBarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
