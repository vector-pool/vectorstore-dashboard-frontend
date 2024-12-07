import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Paper, TextField } from '@mui/material';
import { Autocomplete } from '@mui/lab';
import PredictionOverview from '../components/Predictions/PredictionOverview';



const PredictionsPage = () => {
  const styles = {
    root: {
      backgroundColor: 'gray',
      color: '#e0e0e0',
      fontFamily: 'Arial, sans-serif',
      lineHeight: 1.6,
      margin: 0,
      padding: 0,
      minHeight: '100vh', // Ensures the background spans the entire viewport
      boxSizing: 'border-box', // Ensures padding and borders are included in dimensions
      transition: 'all 0.3s ease',
    },
    header: {
      maxWidth: '1400px',
      margin: '20px auto',
      backgroundColor: '#545c23',
      color: 'white',
      padding: '20px 0px',
      textAlign: 'center',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
      position: 'relative',
    },
    main: {
      maxWidth: '1300px',
      margin: '20px auto',
      background: '#1e1e1e',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
      transition: 'all 0.3s ease',
    },
    section: {
      marginBottom: '20px',
    },
    h1: {
      marginTop: 0,
      color: 'white',
    },
    h2: {
      color: 'rgb(131, 195, 34)',
    },
    h3: {
      color: 'rgb(131, 195, 34)',
    },
    ul: {
      margin: '10px 0',
      paddingLeft: '20px',
    },
    li: {
      marginBottom: '8px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      margin: '20px 0',
    },
    th: {
      padding: '10px',
      textAlign: 'left',
      backgroundColor: '#333333',
    },
    td: {
      padding: '10px',
      textAlign: 'left',
      border: '1px solid #444',
    },
    footer: {
      textAlign: 'center',
      padding: '10px 0',
      backgroundColor: '#130f15',
      color: 'white',
      marginTop: '20px',
      transition: 'background-color 0.3s ease',
    },
    linkContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      position: 'absolute',
      right: '50px',
      top: '20px',
    },
    img: {
      verticalAlign: 'middle',
      width: '20px',
      height: '20px',
    },
  };

  return (
    <div style={styles.root}>
      <header style={styles.header}>
        <h1 style={styles.h1}>VectorStore Subnet</h1>
        <div style={styles.linkContainer}>
          <p>
            <a href="https://discord.gg" target="_blank" rel="noopener noreferrer">
              Discord
              <img src="/vectorstore.png" alt="Discord" style={styles.img} />
            </a>
          </p>
          <p>
            <a href="https://discord.gg" target="_blank" rel="noopener noreferrer">
              GitHub
              <img src="/logo512.png" alt="GitHub" style={styles.img} />
            </a>
          </p>
        </div>
      </header>
      <main style={styles.main}>
        <section style={styles.section}>
          <h2 style={styles.h2}>Validator Installation</h2>
          <p>Please see Validator Setup in the quick start guide.</p>
        </section>
        <section style={styles.section}>
          <h2 style={styles.h2}>Miner Installation</h2>
          <p>Please see Miner Setup in the quick start guide.</p>
        </section>
        <section style={styles.section}>
          <h2 style={styles.h2}>Abstract</h2>
          <p>
            This subnet is dedicated to providing a reliable and decentralized vector storage
            solution, specifically designed to enhance AI training and development within the
            Bittensor ecosystem.
          </p>
        </section>
        <section style={styles.section}>
          <h2 style={styles.h2}>Objectives & Contributions</h2>
          <p>
            The primary objective of Subnet VectorStore is to embed texts and store them
            efficiently. Once stored, it processes queries from validators to identify the most
            relevant results based on the pre-computed embeddings.
          </p>
          <ul style={styles.ul}>
            <li style={styles.li}>
              Miners embed and store data, primarily text, and respond to queries from validators.
            </li>
            <li style={styles.li}>
              Validators assess miners' performance by evaluating the quality of vector storage
              and query result accuracy.
            </li>
          </ul>
        </section>
        <section style={styles.section}>
          <h2 style={styles.h2}>Units</h2>
          <h3 style={styles.h3}>User</h3>
          <p>
            The largest unit of storage, similar to an organization in Pinecone, encompassing
            multiple organizations.
          </p>
          <h3 style={styles.h3}>Organization</h3>
          <p>The mid-level unit of storage, comprising several namespaces.</p>
          <h3 style={styles.h3}>Namespace</h3>
          <p>
            The smallest unit of storage, capable of containing hundreds or thousands of vectors,
            each representing an embedding of text.
          </p>
        </section>
        <section style={styles.section}>
          <h2 style={styles.h2}>How This Subnet Works</h2>
          <h3 style={styles.h3}>Validator</h3>
          <p>
            Validators send queries to miners and perform CRUD operations, issuing create, update,
            delete, and read queries. They validate storage and embedding performance through read
            queries.
          </p>
          <h3 style={styles.h3}>Miner</h3>
          <p>
            Miners embed and save data, identifying the most relevant text based on validators'
            requests using advanced embedding models.
          </p>
        </section>
        <section style={styles.section}>
          <h2 style={styles.h2}>Incentive Mechanism</h2>
          <p>Miners are categorized into five groups based on the number of synapse circles processed:</p>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Rank</th>
                <th style={styles.th}>Count</th>
                <th style={styles.th}>Weight</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Squire</td>
                <td style={styles.td}>&lt; 100</td>
                <td style={styles.td}>0.6</td>
              </tr>
              <tr>
                <td style={styles.td}>Knight</td>
                <td style={styles.td}>&lt; 150</td>
                <td style={styles.td}>0.7</td>
              </tr>
              <tr>
                <td style={styles.td}>Champion</td>
                <td style={styles.td}>&lt; 250</td>
                <td style={styles.td}>0.8</td>
              </tr>
              <tr>
                <td style={styles.td}>Paladin</td>
                <td style={styles.td}>&lt; 400</td>
                <td style={styles.td}>0.9</td>
              </tr>
              <tr>
                <td style={styles.td}>Lord</td>
                <td style={styles.td}>&ge; 400</td>
                <td style={styles.td}>1.0</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section style={styles.section}>
          <h2 style={styles.h2}>Rewarding</h2>
          <p>The reward is calculated using the cosine similarity score:</p>
          <p>
            <code>reward = 0.8 * score7 + 0.1 * score5 + 0.1 * score3</code>
          </p>
          <p>
            This ensures higher rewards for scores close to 1.0 and gradual penalties for lower
            scores.
          </p>
        </section>
      </main>
    </div>
  );
};

export default PredictionsPage;

