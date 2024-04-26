import * as d3 from 'd3';
import { useEffect } from 'react';

const ConditionMap = ({ data, id }) => {
  useEffect(() => {
    const containerId = `condition-map-container-${id}`;
    d3.select(`#${containerId}`).select('svg').remove();

    const width = 800; // Increased width for better visualization
    const height = 550; // Increased height for better visualization
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const padding = 1; // Padding to keep nodes within SVG boundaries

    const svg = d3.select(`#${containerId}`)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

      const trueCount = data.medications.reduce((acc, medication) => {
        return acc + medication.is_effective.filter(Boolean).length;
      }, 0);
  
      const falseCount = data.medications.reduce((acc, medication) => {
        return acc + medication.is_effective.length;
      }, 0) - trueCount;

    const nameNode = {
      id: data.name,
      group: 0,
      effectiveness: trueCount / (trueCount + falseCount),
      count: trueCount + falseCount
    };

    const nodes = data.medications.map((medication) => {
      const trueCount = medication.is_effective.filter(Boolean).length;
      const falseCount = medication.is_effective.length - trueCount;
      return {
        id: medication.name,
        group: 1,
        effectiveness: trueCount / medication.is_effective.length,
        pieData: [trueCount, falseCount],
        count: medication.is_effective.length
      };
    });

    // Calculate weighted distance based on the count of entries
    const maxCount = Math.max(...nodes.map(node => node.count));
    const links = nodes.map((medication) => ({
      source: nameNode,
      target: medication,
      distance: (1.5 - (medication.count / maxCount)) * 250 // Adjusted distance formula
    }));

    const link = svg.selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .style('stroke', '#aaa');

    const node = svg.selectAll('.node')
      .data([nameNode, ...nodes])
      .enter()
      .append('g')
      .attr('class', 'node');

    node.filter(d => d.group === 0)
      .append('circle')
      .attr('r', d => 85 * Math.sqrt(nameNode.effectiveness)) // Adjusted size based on effectiveness
      .style('fill', '#33acae');
     
    node.each(function (d) {
      if (d.group === 1) {
        const pie = d3.pie();
        const arc = d3.arc()
          .innerRadius(0)
          .outerRadius(Math.max(...d.pieData) * Math.sqrt(nameNode.effectiveness) * 5);
        const g = d3.select(this)
          .selectAll('.arc')
          .data(pie(d.pieData))
          .enter().append('g')
          .attr('class', 'arc');
    
        g.append('path')
          .attr('d', arc)
          .style('fill', (piePart) => {
            // Check if piePart.data is effective or not and assign color accordingly
            return piePart.data === d.pieData[0] ? "#33acae47" : 'red';
          });
      }
    });    

    node.append('text')
      .text(d => d.id)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em') // Center text vertically within the circle
      .style('font-size', function(d) {
        const radius = d.group === 0 ? 20 * Math.sqrt(nameNode.effectiveness) : 10;
        const maxLength = Math.sqrt(Math.pow(radius, 2) / 2); // Max length to fit in circle diagonally
        const fontSize = Math.min(5 * radius, (5 * radius - 2) / this.getComputedTextLength() * 72, maxLength / this.getComputedTextLength() * 72);
        return fontSize + 'px';
      });

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink()
        .id(d => d.id)
        .links(links)
        .distance(d => d.distance) // Set distance based on the link object
      )
      .force('charge', d3.forceManyBody().strength(-500)) // Increased repulsion for better stability
      .force('center', d3.forceCenter((width - padding) / 2, (height - padding) / 2)) // Center force with padding
      .on('tick', ticked);

    simulation.nodes([nameNode, ...nodes]);

    function ticked() {
      link
        .attr('x1', d => Math.max(padding, Math.min(width - padding, d.source.x)))
        .attr('y1', d => Math.max(padding, Math.min(height - padding, d.source.y)))
        .attr('x2', d => Math.max(padding, Math.min(width - padding, d.target.x)))
        .attr('y2', d => Math.max(padding, Math.min(height - padding, d.target.y)));

      node
        .attr('transform', d => `translate(${Math.max(padding, Math.min(width - padding, d.x))},${Math.max(padding, Math.min(height - padding, d.y))})`);
    }
  }, [data, id]); 

  return <div id={`condition-map-container-${id}`}></div>;
}; 

export default ConditionMap;

