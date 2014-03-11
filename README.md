BigData on the Web
===========================

DVSI is a Web-based Data Visualization and Animation
framework using HTML5, CSS, SVG, and Javascript scripting. 

DVSI uses Sencha Ext JS 4 as the application architecture framework, and mostly D3.js library for 2D data-driven SVG graphics at this moment, WebGL will be used for 3D hardware-accelerated visualization in the near future. 

DVSI aims to support a wide range of data available through online reposities (downloaded and hosted with server, or through real-time RESTful connection from data services), and apply them to a series of visualization styles implemented within the framework. Users will be able to visually inspect various dataset from the same web interface, inspire inter-data connection and comparison, we call this co-data-visualization. 

Another design principle of DVSI is that, data is presented in two represenations: Raw data as table or list, and an interactive Visualiation. We call them "raw data view" and "viz view". The two views closely communicate with each other,e.g. select data in the visualization will highlight in the corresponding raw data view, and vice versa. 

At this moment, DVSI is simply a hodge-podge of different data and viz styles mostly inspired by the d3.js gallery, but it can be a underlying platform for customized applications in specialty areas such as genome, medical, healthcareetc. On the data side, complex and detailed data source retrieval can be implemented; on the viz side, noval visualization can be created to the specific set of data, with speical consideration of big data. 

DVSI can also behave as a gateway, with embedded data source connection implementaion via Ajax, and/or serve as a graphics end to remote visualization running on HPC. 




