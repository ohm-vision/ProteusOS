import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { PublicKey } from '@/components/publicKey.component';
import { Card, CardHeader } from '@mui/material';
// import ProTip from '@/components/ProTip';
// import Copyright from '@/components/Copyright';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          ProteusOS
        </Typography>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          Privacy. Yours.
        </Typography>
        <PublicKey />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
          >
          <Card>
            <CardHeader
              title="Environments"
              />
          </Card>

          <Card>
            <CardHeader
              title="Modules"
              />
          </Card>
        </Box>
        {/* <ProTip />
        <Copyright /> */}
      </Box>
    </Container>
  );
}