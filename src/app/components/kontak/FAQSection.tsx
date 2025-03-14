'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FAQSectionProps {}

const FAQSection: React.FC<FAQSectionProps> = () => {
  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      id: 'panel1',
      question: 'Bagaimana cara memesan layanan percetakan di PT Sarana Pancakarya Nusa?',
      answer: 'Anda dapat memesan layanan percetakan kami dengan menghubungi tim kami melalui telepon, email, atau mengisi formulir kontak di website ini. Tim kami akan segera menghubungi Anda untuk membahas kebutuhan dan memberikan penawaran.'
    },
    {
      id: 'panel2',
      question: 'Berapa lama waktu yang dibutuhkan untuk menyelesaikan pesanan?',
      answer: 'Waktu pengerjaan bervariasi tergantung pada jenis produk, jumlah, dan tingkat kerumitan. Untuk pesanan standar, umumnya membutuhkan waktu 3-7 hari kerja. Untuk proyek yang lebih besar atau kompleks, kami akan memberikan estimasi waktu yang lebih spesifik setelah berdiskusi dengan Anda.'
    },
    {
      id: 'panel3',
      question: 'Apakah PT Sarana Pancakarya Nusa menyediakan layanan desain grafis?',
      answer: 'Ya, kami menyediakan layanan desain grafis profesional untuk membantu Anda menciptakan material cetak yang menarik dan efektif. Tim desainer kami akan bekerja sama dengan Anda untuk mengembangkan konsep yang sesuai dengan kebutuhan dan branding Anda.'
    },
    {
      id: 'panel4',
      question: 'Apakah saya bisa mendapatkan sampel produk sebelum memesan dalam jumlah besar?',
      answer: 'Tentu, kami menyediakan layanan sampel atau proof untuk memastikan hasil akhir sesuai dengan harapan Anda. Biaya sampel akan dikenakan tergantung pada jenis produk, namun biaya tersebut dapat dikreditkan ke pesanan akhir Anda.'
    },
    {
      id: 'panel5',
      question: 'Apakah PT Sarana Pancakarya Nusa melayani pengiriman ke seluruh Indonesia?',
      answer: 'Ya, kami melayani pengiriman ke seluruh wilayah Indonesia. Biaya pengiriman akan dihitung berdasarkan berat, volume, dan tujuan pengiriman. Kami juga bekerja sama dengan berbagai jasa ekspedisi terpercaya untuk memastikan pesanan Anda tiba dengan aman dan tepat waktu.'
    },
    {
      id: 'panel6',
      question: 'Bagaimana dengan keamanan untuk dokumen berharga yang dicetak?',
      answer: 'Kami menerapkan standar keamanan tinggi untuk semua dokumen berharga. Fasilitas kami dilengkapi dengan sistem keamanan 24 jam dan akses terbatas. Kami juga menawarkan berbagai fitur keamanan cetak seperti hologram, watermark, microtext, dan tinta khusus untuk mencegah pemalsuan.'
    }
  ];

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: '#f8fafc' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          fontWeight="bold"
          align="center"
          gutterBottom
          sx={{ mb: 2 }}
        >
          Pertanyaan yang Sering Diajukan
        </Typography>
        
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ 
            maxWidth: 700, 
            mx: 'auto', 
            mb: 6 
          }}
        >
          Temukan jawaban untuk pertanyaan umum tentang layanan percetakan dan penerbitan kami.
        </Typography>
        
        <Paper 
          elevation={0} 
          sx={{ 
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          }}
        >
          {faqs.map((faq, index) => (
            <Accordion
              key={faq.id}
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
              disableGutters
              elevation={0}
              sx={{
                borderBottom: index < faqs.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
                '&:before': {
                  display: 'none',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
                sx={{ 
                  px: 4, 
                  py: 2,
                  '&.Mui-expanded': {
                    bgcolor: 'rgba(25, 118, 210, 0.04)',
                  }
                }}
              >
                <Typography 
                  variant="subtitle1" 
                  fontWeight="bold"
                  sx={{ color: expanded === faq.id ? 'primary.main' : 'text.primary' }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 4, py: 3, bgcolor: 'rgba(25, 118, 210, 0.02)' }}>
                <Typography variant="body1" color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      </Container>
    </Box>
  );
};

export default FAQSection; 