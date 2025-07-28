// Mind map data structure based on the provided image
const mindMapData = {
    name: "Artificial AI",
    description: "Comprehensive overview of Artificial Intelligence technologies and applications",
    children: [
        {
            name: "Purpose",
            description: "The fundamental goals and objectives of artificial intelligence systems",
            children: [
                {
                    name: "Revolutionary Policy Detection",
                    description: "AI systems designed to detect and analyze revolutionary policies and changes"
                },
                {
                    name: "Overcome AI Limitations",
                    description: "Addressing current constraints and boundaries in AI technology"
                },
                {
                    name: "Improve Patient Outcomes",
                    description: "Healthcare applications focused on better treatment results"
                }
            ]
        },
        {
            name: "Challenges of Traditional AI",
            description: "Current limitations and obstacles in artificial intelligence development",
            children: [
                {
                    name: "Data Requirements",
                    description: "Issues related to data collection, quality, and processing needs",
                    children: [
                        {
                            name: "Use of Redundant Annotated Images",
                            description: "Dependency on large datasets with manual annotations"
                        },
                        {
                            name: "Unfair for Limited Data",
                            description: "Performance degradation when training data is scarce"
                        },
                        {
                            name: "Unfair for New Policy Types",
                            description: "Difficulty adapting to novel policy categories"
                        }
                    ]
                },
                {
                    name: "Infrastructure Demands",
                    description: "Technical and hardware requirements for AI implementation",
                    children: [
                        {
                            name: "Specialized High-Performance Hardware",
                            description: "Need for powerful GPUs and specialized processors"
                        },
                        {
                            name: "Expensive & Complex Maintenance",
                            description: "High costs for system upkeep and technical support"
                        }
                    ]
                },
                {
                    name: "Latency Issues",
                    description: "Time delays and performance bottlenecks in AI systems",
                    children: [
                        {
                            name: "Delays in Real-Time Diagnosis",
                            description: "Slow response times affecting immediate decision-making"
                        }
                    ]
                },
                {
                    name: "Image Resolution Restrictions",
                    description: "Limitations in processing high-quality visual data",
                    children: [
                        {
                            name: "Limited Compatibility",
                            description: "Constraints in handling various image formats and sizes"
                        }
                    ]
                },
                {
                    name: "Developed During PhD Research",
                    description: "Academic limitations and research-focused development constraints"
                },
                {
                    name: "Minimal Data Requirements",
                    description: "Challenges when working with limited training datasets",
                    children: [
                        {
                            name: "Few Limited Annotated Images",
                            description: "Insufficient labeled data for effective training"
                        },
                        {
                            name: "Broadens Accessibility",
                            description: "Making AI more accessible despite data limitations"
                        }
                    ]
                }
            ]
        },
        {
            name: "Solution: Ancestral AI Features",
            description: "Advanced AI capabilities that address traditional limitations",
            children: [
                {
                    name: "Extremely Lightweight & Efficient",
                    description: "Optimized algorithms requiring minimal computational resources",
                    children: [
                        {
                            name: "Few Thousand Parameters",
                            description: "Highly efficient models with minimal parameter count"
                        },
                        {
                            name: "Real-Time Cloud-Based Inference",
                            description: "Fast processing capabilities in cloud environments"
                        },
                        {
                            name: "No Latency Issues",
                            description: "Immediate response times for real-time applications"
                        },
                        {
                            name: "No Special Hardware Needed",
                            description: "Compatible with standard computing infrastructure"
                        }
                    ]
                },
                {
                    name: "Universal Resolution Compatibility",
                    description: "Ability to process images of any resolution or format",
                    children: [
                        {
                            name: "Works with Any Resolution",
                            description: "Flexible input handling for various image sizes"
                        },
                        {
                            name: "Tiny Archived Frames",
                            description: "Efficient processing of compressed video frames"
                        },
                        {
                            name: "Ultra HD Video",
                            description: "Support for high-definition video processing"
                        },
                        {
                            name: "Broad Compatibility & Global Access",
                            description: "Universal accessibility across different platforms"
                        }
                    ]
                },
                {
                    name: "Lowering Barriers to Entry",
                    description: "Making AI technology more accessible to diverse users",
                    children: [
                        {
                            name: "Reduced Data Needs",
                            description: "Minimal training data requirements for effective performance"
                        },
                        {
                            name: "Eliminates Specialized Hardware",
                            description: "No need for expensive, specialized computing equipment"
                        },
                        {
                            name: "Unparalleled Resolution Flexibility",
                            description: "Adaptability to various input formats and qualities"
                        }
                    ]
                }
            ]
        },
        {
            name: "Impact",
            description: "Real-world effects and benefits of advanced AI implementation",
            children: [
                {
                    name: "Increased Accessibility",
                    description: "Making AI technology available to broader populations",
                    children: [
                        {
                            name: "More Efficient Healthcare Worldwide",
                            description: "Global improvement in medical diagnosis and treatment"
                        }
                    ]
                },
                {
                    name: "Empowers Clinicians",
                    description: "Enhancing medical professionals' diagnostic capabilities",
                    children: [
                        {
                            name: "Powerful, Fast, Adaptable Tool",
                            description: "Advanced diagnostic assistance for healthcare providers"
                        },
                        {
                            name: "Enhances Early Detection",
                            description: "Improved ability to identify diseases in early stages"
                        }
                    ]
                },
                {
                    name: "Potentially Saves Lives",
                    description: "Life-saving applications of AI in critical situations"
                }
            ]
        }
    ]
};

class InteractiveMindMap {
    constructor(containerId, data) {
        this.container = d3.select(containerId);
        this.data = data;
        this.width = window.innerWidth;
        this.height = window.innerHeight - 100;
        this.isHandMode = false;
        
        this.setupSVG();
        this.setupZoom();
        this.setupTooltip();
        this.processData();
        this.createVisualization();
        this.setupEventListeners();
    }
    
    setupSVG() {
        this.svg = this.container
            .attr("width", this.width)
            .attr("height", this.height);
            
        this.g = this.svg.append("g");
    }
    
    setupZoom() {
        this.zoom = d3.zoom()
            .scaleExtent([0.1, 4])
            .on("zoom", (event) => {
                if (this.isHandMode) {
                    this.g.attr("transform", event.transform);
                }
            });
            
        this.svg.call(this.zoom);
    }
    
    setupTooltip() {
        this.tooltip = d3.select("body").append("div")
            .attr("class", "tooltip");
    }
    
    processData() {
        // Create hierarchy and add levels
        this.root = d3.hierarchy(this.data);
        this.root.each(d => {
            d.level = d.depth;
            d._children = d.children;
            if (d.depth > 1) {
                d.children = null; // Start with deeper levels collapsed
            }
        });
        
        // Set up tree layout
        this.treeLayout = d3.tree()
            .size([this.height - 200, this.width - 400])
            .separation((a, b) => {
                return (a.parent === b.parent ? 1 : 2) / a.depth;
            });
    }
    
    createVisualization() {
        this.update(this.root);
        
        // Center the visualization
        const rootX = this.root.x || this.height / 2;
        const rootY = this.root.y || 200;
        const centerTransform = d3.zoomIdentity
            .translate(this.width / 2 - rootY, this.height / 2 - rootX)
            .scale(0.8);
            
        this.svg.transition()
            .duration(750)
            .call(this.zoom.transform, centerTransform);
    }
    
    update(source) {
        const treeData = this.treeLayout(this.root);
        const nodes = treeData.descendants();
        const links = treeData.descendants().slice(1);
        
        // Update nodes
        const node = this.g.selectAll(".node")
            .data(nodes, d => d.id || (d.id = ++this.i));
            
        const nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${source.y0 || 0},${source.x0 || 0})`)
            .on("click", (event, d) => this.handleNodeClick(event, d))
            .on("mouseover", (event, d) => this.showTooltip(event, d))
            .on("mouseout", () => this.hideTooltip());
            
        // Add circles
        nodeEnter.append("circle")
            .attr("r", 0)
            .style("fill", d => this.getNodeColor(d))
            .style("stroke", "#fff")
            .attr("class", d => `level-${d.level}`);
            
        // Add text
        nodeEnter.append("text")
            .attr("dy", "0.31em")
            .attr("text-anchor", "middle")
            .style("fill-opacity", 0)
            .text(d => this.truncateText(d.data.name, d.level))
            .attr("class", d => `level-${d.level}`);
            
        // Update existing nodes
        const nodeUpdate = nodeEnter.merge(node);
        
        nodeUpdate.transition()
            .duration(750)
            .attr("transform", d => `translate(${d.y},${d.x})`);
            
        nodeUpdate.select("circle")
            .transition()
            .duration(750)
            .attr("r", d => this.getNodeRadius(d))
            .style("fill", d => this.getNodeColor(d));
            
        nodeUpdate.select("text")
            .transition()
            .duration(750)
            .style("fill-opacity", 1);
            
        // Remove old nodes
        const nodeExit = node.exit().transition()
            .duration(750)
            .attr("transform", d => `translate(${source.y},${source.x})`)
            .remove();
            
        nodeExit.select("circle").attr("r", 0);
        nodeExit.select("text").style("fill-opacity", 0);
        
        // Update links
        const link = this.g.selectAll(".link")
            .data(links, d => d.id);
            
        const linkEnter = link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", d => {
                const o = { x: source.x0 || 0, y: source.y0 || 0 };
                return this.diagonal({ source: o, target: o });
            })
            .style("stroke", d => this.getLinkColor(d))
            .attr("class", d => `link level-${d.depth}`);
            
        const linkUpdate = linkEnter.merge(link);
        
        linkUpdate.transition()
            .duration(750)
            .attr("d", d => this.diagonal({ source: d.parent, target: d }));
            
        link.exit().transition()
            .duration(750)
            .attr("d", d => {
                const o = { x: source.x, y: source.y };
                return this.diagonal({ source: o, target: o });
            })
            .remove();
            
        // Store old positions
        nodes.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }
    
    diagonal(d) {
        return `M ${d.source.y} ${d.source.x}
                C ${(d.source.y + d.target.y) / 2} ${d.source.x},
                  ${(d.source.y + d.target.y) / 2} ${d.target.x},
                  ${d.target.y} ${d.target.x}`;
    }
    
    handleNodeClick(event, d) {
        if (!this.isHandMode) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            this.update(d);
            this.showNodeInfo(d);
        }
    }
    
    showNodeInfo(d) {
        const infoPanel = document.getElementById("infoPanel");
        const nodeTitle = document.getElementById("nodeTitle");
        const nodeDescription = document.getElementById("nodeDescription");
        
        nodeTitle.textContent = d.data.name;
        nodeDescription.textContent = d.data.description || "No description available.";
        
        infoPanel.classList.add("active");
        
        setTimeout(() => {
            if (!infoPanel.matches(':hover')) {
                infoPanel.classList.remove("active");
            }
        }, 5000);
    }
    
    showTooltip(event, d) {
        this.tooltip
            .html(`<strong>${d.data.name}</strong><br>${d.data.description || ''}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px")
            .classed("visible", true);
    }
    
    hideTooltip() {
        this.tooltip.classed("visible", false);
    }
    
    getNodeRadius(d) {
        const baseRadius = 30;
        const levelMultiplier = Math.max(0.6, 1 - d.level * 0.15);
        return baseRadius * levelMultiplier;
    }
    
    getNodeColor(d) {
        const colors = [
            "#667eea", // Level 0 - Main node
            "#764ba2", // Level 1 - Primary branches
            "#52de97", // Level 2 - Secondary branches
            "#4facfe", // Level 3 - Tertiary branches
            "#a8edea"  // Level 4+ - Additional levels
        ];
        return colors[Math.min(d.level, colors.length - 1)];
    }
    
    getLinkColor(d) {
        return this.getNodeColor(d);
    }
    
    truncateText(text, level) {
        const maxLength = Math.max(10, 25 - level * 3);
        if (text.length > maxLength) {
            return text.substring(0, maxLength - 3) + "...";
        }
        return text;
    }
    
    expandAll() {
        this.root.each(d => {
            if (d._children) {
                d.children = d._children;
                d._children = null;
            }
        });
        this.update(this.root);
    }
    
    collapseAll() {
        this.root.each(d => {
            if (d.children && d.depth > 0) {
                d._children = d.children;
                d.children = null;
            }
        });
        this.update(this.root);
    }
    
    resetView() {
        const centerTransform = d3.zoomIdentity
            .translate(this.width / 2 - 200, this.height / 2)
            .scale(0.8);
            
        this.svg.transition()
            .duration(750)
            .call(this.zoom.transform, centerTransform);
    }
    
    toggleHandMode() {
        this.isHandMode = !this.isHandMode;
        this.svg.style("cursor", this.isHandMode ? "grab" : "default");
        
        if (this.isHandMode) {
            this.svg.on(".zoom", null);
            this.svg.call(this.zoom);
        } else {
            this.svg.on("click", null);
        }
    }
    
    setupEventListeners() {
        // Reset zoom button
        document.getElementById("resetZoom").addEventListener("click", () => {
            this.resetView();
        });
        
        // Expand all button
        document.getElementById("expandAll").addEventListener("click", () => {
            this.expandAll();
        });
        
        // Collapse all button
        document.getElementById("collapseAll").addEventListener("click", () => {
            this.collapseAll();
        });
        
        // Hand mode toggle
        document.getElementById("handMode").addEventListener("change", (event) => {
            this.toggleHandMode();
        });
        
        // Window resize handler
        window.addEventListener("resize", () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight - 100;
            this.svg.attr("width", this.width).attr("height", this.height);
            this.treeLayout.size([this.height - 200, this.width - 400]);
            this.update(this.root);
        });
        
        // Info panel auto-hide
        const infoPanel = document.getElementById("infoPanel");
        infoPanel.addEventListener("mouseleave", () => {
            setTimeout(() => {
                if (!infoPanel.matches(':hover')) {
                    infoPanel.classList.remove("active");
                }
            }, 1000);
        });
    }
}

// Initialize the mind map when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const mindMap = new InteractiveMindMap("#mindmap", mindMapData);
    
    // Add keyboard shortcuts
    document.addEventListener("keydown", (event) => {
        switch(event.key) {
            case 'r':
                mindMap.resetView();
                break;
            case 'e':
                mindMap.expandAll();
                break;
            case 'c':
                mindMap.collapseAll();
                break;
            case 'h':
                document.getElementById("handMode").click();
                break;
        }
    });
});